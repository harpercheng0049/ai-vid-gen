"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getUserDetail();
  }, [user]);

  const getUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetail(result[0]);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <div>
          <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
            <SideNav />
          </div>

          <div className="md:hidden fixed top-20 left-4 z-50">
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu className="size-8 text-gray-700" />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden fixed top-20 right-5 inset-0 z-50 bg-white">
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="size-8 text-gray-600" />
                </button>
              </div>
              <SideNav onLinkClick={() => setIsMenuOpen(false)} />
            </div>
          )}

          <div>
            <Header />
            <div className="md:ml-64 p-10">{children}</div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  );
}
