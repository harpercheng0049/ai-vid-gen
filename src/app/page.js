"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-indigo-100 to-white">
      <h1 className="text-4xl md:text-6xl font-medium mb-6">
        Create AI-Generated Videos in Minutes
      </h1>
      <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-2xl">
        No video editing skills? No problem. Just pick a topic, style, and
        length – our AI will do the rest: write scripts, generate voiceovers,
        select visuals, and sync everything with captions.
      </p>
      <Link href="/dashboard">
        <Button className="text-lg px-6 py-6 cursor-pointer">Start Now</Button>
      </Link>
      <div className="mt-12">
        <img
          src="/placeholder-video.gif"
          alt="Preview"
          className="rounded-xl shadow-2xl w-[300px] md:w-[550px]"
        />
      </div>
    </div>
  );
}
