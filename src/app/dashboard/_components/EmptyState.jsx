import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="p-5 py-32 flex items-center flex-col mt-10 border-2 border-dashed">
      <h2 className="mb-2">You don't have any video created</h2>
      <Link href={"/dashboard/create-new"}>
        <Button className="cursor-pointer mt-2">Create New Video</Button>
      </Link>
    </div>
  );
}
