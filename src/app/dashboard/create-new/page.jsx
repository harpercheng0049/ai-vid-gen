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

export default function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    GenerateAudioFile(scriptData);
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
    // videoScriptData.forEach((item) => {
    //   script = script + item.ContentText + "";
    // });

    await axios
      .post("/api/generate-audio", {
        text: videoScriptData,
        id: id,
      })
      .then((resp) => {
        console.log(resp.data);
      });

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
