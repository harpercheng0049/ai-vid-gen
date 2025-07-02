"use client";
import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  Img,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // 安全計算總影片長度（最後一段字幕的結尾時間）
  const durationInFrames =
    (captions?.[captions.length - 1]?.end / 1000) * fps || 0;

  // 用 useEffect 通知父層影片總時長（只在 mount 時執行）
  useEffect(() => {
    if (setDurationInFrame && durationInFrames > 0) {
      setDurationInFrame(durationInFrames);
    }
  }, [durationInFrames, setDurationInFrame]);

  // 取得目前時間點應該顯示的字幕內容
  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption?.text || "";
  };

  // 若必要資料未就緒，不顯示影片
  if (!script || !captions || !imageList || !audioFileUrl) {
    return null;
  }

  return (
    <AbsoluteFill className="bg-gray-700">
      {imageList.map((item, index) => {
        const durationPerImage = durationInFrames / imageList.length;
        const startTime = index * durationPerImage;

        // 加入圖片縮放動畫（交錯）
        const scale = interpolate(
          frame,
          [
            startTime,
            startTime + durationPerImage / 2,
            startTime + durationPerImage,
          ],
          index % 2 === 0 ? [1, 1.2, 1] : [1.2, 1, 1.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={durationPerImage}
          >
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale})`,
              }}
            />
            <div className="absolute bottom-0 w-full h-[150px] text-white flex items-center justify-center">
              <h2 className="text-xl">{getCurrentCaptions()}</h2>
            </div>
          </Sequence>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
