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
      <p className="text-gray-600">This is a demo side project</p>
      <h1 className="text-4xl md:text-6xl font-medium my-6">
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
      <div className="mt-12 w-full md:w-4/5 lg:w-3/5 h-[200px] relative overflow-hidden rounded-3xl">
        <Image
          src="/landing-bg.png"
          alt="landing-bg"
          width={1536}
          height={1024}
          objectFit="cover"
        />

        <div className="absolute inset-0 flex items-center justify-center  text-white p-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-2">
              From Idea to Video in Under 3 Minutes
            </h2>
            <p className="text-sm mt-2">
              Generate complete videos with script, voice, and visuals — no
              editing required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
