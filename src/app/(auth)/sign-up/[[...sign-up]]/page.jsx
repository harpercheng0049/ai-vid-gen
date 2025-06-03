import { SignUp } from '@clerk/nextjs'
import Image from "next/image";

export default function Page() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-indigo-50">
        <div className="relative h-full w-full">
          <Image
            src="/sign_in_img.png"
            alt="login"
            fill
            className="object-cover" 
            priority
          />
        </div>
        <div className="flex justify-center items-center">
          <SignUp />
        </div>
      </div>
    )
}