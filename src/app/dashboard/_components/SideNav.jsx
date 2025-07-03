"use client";
import {
  CircleUserRound,
  FileVideo,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ onLinkClick }) {
  const pathname = usePathname();

  const MenuOption = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ShieldPlus,
    },
  ];

  return (
    <div className="w-full md:w-64 h-screen shadow-none md:shadow-md p-5">
      <div className="grid gap-3">
        {MenuOption.map((item, index) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link href={item.path} key={item.id} onClick={onLinkClick}>
              <div
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-gray-100 ${
                  isActive ? "bg-gray-200" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <h2>{item.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
