import Image from "next/image";
import React from "react";

export function Partners({ className }: { className?: string }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-manrope font-bold text-gray-900 mb-12">
          Partners
        </h2>
        <div className="flex justify-center items-center gap-80 mb-12">
          <Image
            src="/partner2.png"
            alt="QR code to download the app"
            width={140}
            height={140}
            className="rounded-md"
          />
          <Image
            src="/partner1.png"
            alt="QR code to download the app"
            width={140}
            height={140}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
