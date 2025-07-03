"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
        <h2 className="font-bold text-xl">Ai Vid Gen</h2>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image src={"/coin.svg"} width={20} height={20} alt="coin" />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button className="cursor-pointer">Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}
