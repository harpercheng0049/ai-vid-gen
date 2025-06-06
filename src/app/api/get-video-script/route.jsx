// 匯入 Gemini AI 聊天模型
import { chatSession } from "@/configs/AiModel";

// Next.js 內建的方式來產生 API 回應（取代 express 的 res.json()）
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 從前端發來的 JSON body 裡拿到 prompt
    const { prompt } = await req.json();
    console.log(prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    return NextResponse.json({ result: JSON.parse(result.response.text()) });
  } catch (e) {
    return NextResponse.json({ "Error:": e });
  }
}
