"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";

export default function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetVideoList();
  }, [user]);

  // Used to Get Users Video
  const GetVideoList = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setVideoList(result);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-2xl">Dashboard</h2>

        <Link href={"/dashboard/create-new"}>
          <Button className="cursor-pointer">+ Create New</Button>
        </Link>
      </div>

      {/* Empty State */}
      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/* List of Videos */}
      <VideoList videoList={videoList} />
    </div>
  );
}
