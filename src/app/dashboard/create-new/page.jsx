"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const scriptData = "This is a Test Message.";
const FILEURL =
  "https://firebasestorage.googleapis.com/v0/b/ai-vid-gen-2d498.firebasestorage.app/o/ai-video-files%2F65673159-e7df-4ca2-86eb-0dce50450faa.mp3?alt=media&token=4be0d273-8252-4f35-aaa0-16456cc52fe7";

const VideoSCRIPT = [
  {
    imagePrompt:
      "Heartwarming, realistic close-up photo of a kind-faced Polish soldier from WWII carefully feeding a small bear cub with an old vodka bottle filled with milk. The soldier is smiling gently. They are in a makeshift military camp, with tents and equipment in the soft-focus background. Warm, gentle lighting. Captured on vintage Kodak film, realistic, hyper-detailed.",
    ContentText:
      "They adopted him, named him Wojtek, and raised him on condensed milk from an old vodka bottle.",
  },
];

export default function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateCaption(FILEURL);
    GenerateImage();
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
    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
      });
    setLoading(false);
  };

  // 發送 API 請求的函式，Generate Audio File
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + "";
    });

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((resp) => {
        setAudioFileUrl(resp.data.result);
        resp.data.result && GenerateCaption(resp.data.result);
      });

    setLoading(false);
  };

  // 發送 API 請求的函式，Generate Caption
  const GenerateCaption = async (fileUrl) => {
    setLoading(true);

    await axios
      .post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      })
      .then((resp) => {
        console.log(resp.data.result);
        setCaptions(resp?.data?.result);
        GenerateImage();
      });

    console.log(videoScript, captions, audioFileUrl);
  };

  // 發送 API 請求的函式，Generate Image
  const GenerateImage = () => {
    setLoading(true);
    let images = [];
    VideoSCRIPT.forEach(async (element) => {
      await axios
        .post("/api/generate-image", {
          prompt: element?.imagePrompt,
        })
        .then((resp) => {
          console.log(resp.data.result);
          images.push(resp.data.result);
        });
    });
    setImageList(images);
    console.log(images);
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
