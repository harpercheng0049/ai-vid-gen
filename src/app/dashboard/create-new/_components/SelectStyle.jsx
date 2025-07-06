"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: "Realstic",
      image: "/style-images/realstic-img.png",
    },
    {
      name: "Cartoon",
      image: "/style-images/cartoon-img.png",
    },
    {
      name: "Comic",
      image: "/style-images/comic-img.png",
    },
    {
      name: "WaterColor",
      image: "/style-images/water-color-img.png",
    },
    {
      name: "GTA",
      image: "/style-images/gta-img.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-7">
      <h2 className="font-medium text-xl">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-xl
                ${
                  selectedOption == item.name &&
                  "border-4 border-indigo-400 scale-105"
                }
                `}
            onClick={() => setSelectedOption(item.name)}
          >
            <Image
              alt="style-img"
              src={item.image}
              width={1024}
              height={1536}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
