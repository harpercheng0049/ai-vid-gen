import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      { input }
    );

    const imageUrl = output[0].url();

    return NextResponse.json({ result: imageUrl });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
