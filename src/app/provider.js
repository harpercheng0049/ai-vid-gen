"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

export default function Provider({ children }) {
  // useUser：Clerk 提供的 hook，用來取得目前登入使用者的資訊
  const { user } = useUser();

  useEffect(() => {
    user && isNewUser();
  }, [user]);

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    if (!result[0]) {
      await db.insert(Users).values({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    }
  };
  return <div>{children}</div>;
}
