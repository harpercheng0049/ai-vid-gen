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

export default function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateCaption(FILEURL);
    // GenerateImage();
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
    console.log(prompt);

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
    }
  };

  // 發送 API 請求的函式，Generate Audio File
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + "";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    // 將音檔存到 Context
    setVideoData((prev) => ({
      ...prev,
      audioFileUrl: resp.data.result,
    }));
    // 同時存一份在本地 useState
    setAudioFileUrl(resp.data.result);
    resp.data.result &&
      (await GenerateCaption(resp.data.result, videoScriptData));
  };

  // 發送 API 請求的函式，Generate Caption
  const GenerateCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });
    // 存入 local 狀態
    setCaptions(resp?.data?.result);
    // 存入 context 狀態
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    resp.data.result && (await GenerateImage(videoScriptData));
  };

  // 發送 API 請求的函式，Generate Image
  const GenerateImage = async (videoScriptData) => {
    let images = [];

    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (e) {
        console.log("error:" + e);
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
    console.log(videoData);
    if (Object.keys(videoData).length === 4) {
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

    console.log(result);
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-medium text-4xl text-center">Create New</h2>

      <div className="mt-10 p-10 shadow-md">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}
