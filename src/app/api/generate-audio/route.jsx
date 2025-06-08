import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

// Import other required libraries
const fs = require("fs");
const util = require("util");

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  const storageRef = ref(storage, "ai-video-files/" + id + ".mp3");

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  //  Google 語音 API 回傳的音訊資料（通常是 base64 或 binary 格式的字串）
  const audioBuffer = Buffer.from(response.audioContent, "binary");

  // 將 audioBuffer 上傳到 Firebase Storage 指定位置
  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
  const downloadUrl = await getDownloadURL(storageRef);
  console.log(downloadUrl);
  return NextResponse.json({ result: downloadUrl });
}
