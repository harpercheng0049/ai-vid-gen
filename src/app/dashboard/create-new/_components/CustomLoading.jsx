import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white flex flex-col items-center gap-4 py-8">
        <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-lg font-medium text-gray-700">
          Generating your video...Do not Refresh
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
