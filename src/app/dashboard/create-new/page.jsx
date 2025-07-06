"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export default function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits <= 0) {
      toast("You don't have enough Credits");
      return;
    }

    if (!formData.topic || !formData.imageStyle || !formData.duration) {
      toast("Please fill out all the fields before creating a video.");
      return;
    }
    GetVideoScript();
  };

  // 發送 API 請求的函式，Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic : " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text";

    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    //  如果有拿到資料，儲存到兩個地方
    if (resp.data.result) {
      // 將腳本存到 Context，讓整個應用可以共享
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      // 同時存一份在本地 useState，方便目前元件即時使用
      setVideoScript(resp.data.result);

      // 接著進入第二階段：生成 Audio 語音
      await GenerateAudioFile(resp.data.result);
    } else {
      toast("Server Side Error: Refresh screena and Try again");
      setLoading(false);
    }
  };

  /**
   * 發送 API 請求的函式，Generate Audio File
   * @param {*} videoScriptData
   */
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();

    videoScriptData.forEach((item) => {
      script = script + item.ContentText + "";
    });

    try {
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });

      // 成功才存入
      setVideoData((prev) => ({
        ...prev,
        audioFileUrl: resp.data.result,
      }));
      setAudioFileUrl(resp.data.result);

      // 若成功才繼續生成字幕
      if (resp.data.result) {
        await GenerateCaption(resp.data.result, videoScriptData);
      }
    } catch (err) {
      console.error("Audio generation failed:", err);
      setLoading(false);
    }
  };

  /**
   * 發送 API 請求的函式，Generate Caption
   * @param {*} fileUrl
   */
  const GenerateCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);

    try {
      const resp = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });
      setCaptions(resp.data.result);
      setVideoData((prev) => ({
        ...prev,
        captions: resp.data.result,
      }));
      if (resp.data.result) {
        await GenerateImage(videoScriptData);
      }
    } catch (err) {
      console.error("Caption generation failed:", err);
      setLoading(false);
    }
  };

  // 發送 API 請求的函式，Generate Image
  const GenerateImage = async (videoScriptData) => {
    let images = [];

    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        images.push(resp.data.result);
      } catch (err) {
        console.error("Image generation failed for prompt:", err);
      }
    }
    // 存入 context 狀態
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    // 存入 local 狀態
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    if (videoData && Object.keys(videoData).length === 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    // 在成功建立影片後更新點數
    await UpdateUserCredits();
    setVideoId(result[0].id);
    setPlayVideo(true);
    setLoading(false);
  };

  // Used to update user credits
  const UpdateUserCredits = async () => {
    await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetail((prev) => ({
      ...prev,
      credits: userDetail?.credits - 10,
    }));
  };

  // 關閉視窗時，清空播放狀態與影片資料
  const handleCloseDialog = () => {
    setPlayVideo(false);
    setVideoId(undefined);
    setVideoData({});
  };

  return (
    <div className="p-5 md:p-10 mt-10">
      <h2 className="font-medium text-3xl md:text-4xl text-center">
        Create New
      </h2>

      <div className="mt-5 md:mt-10 p-5 md:p-10 shadow-md">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button
          className="mt-10 w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white"
          onClick={onCreateClickHandler}
        >
          Create Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog
        playVideo={playVideo}
        videoId={videoId}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
