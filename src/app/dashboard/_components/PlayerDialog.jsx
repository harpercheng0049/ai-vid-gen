"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(!!playVideo);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log(result);
    setVideoData(result[0]);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription>
            Preview and export your generated video below.
          </DialogDescription>
        </DialogHeader>

        {videoData && videoData.audioFileUrl && (
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrame.toFixed(0))}
            compositionWidth={300}
            compositionHeight={450}
            fps={30}
            controls={true}
            inputProps={{
              ...videoData,
              setDurationInFrame: (frameValue) =>
                setDurationInFrame(frameValue),
            }}
          />
        )}

        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => {
              router.replace("/dashboard");
              setOpenDialog(false);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            Cancel
          </Button>
          <Button className="bg-indigo-400 hover:bg-indigo-500">Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
