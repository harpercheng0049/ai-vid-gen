import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
        <h2 className="font-bold text-xl">Ai Vid Gen</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button className="cursor-pointer">Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}
