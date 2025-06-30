import React from "react";
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

  const getDurationFrame = () => {
    const duration = (captions[captions?.length - 1]?.end / 1000) * fps || 0;
    setDurationInFrame(duration);
    return duration;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption?.text : "";
  };

  return (
    <AbsoluteFill className="bg-gray-700">
      {imageList?.map((item, index) => {
        const startTime = (index * getDurationFrame()) / imageList?.length;
        const duration = getDurationFrame();

        // 加入圖片縮放動畫
        const scale = interpolate(
          frame,
          [startTime, startTime + duration / 2, startTime + duration],
          index % 2 === 0 ? [1, 1.2, 1] : [1.2, 1, 1.2], // 偶數先放大，奇數先縮小
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence key={index} from={startTime} durationInFrames={duration}>
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale})`, // 動畫
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
