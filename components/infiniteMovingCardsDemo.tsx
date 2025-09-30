"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Image from "next/image";

export function InfiniteMovingCardsDemo() {
  return (
    <div id="gallery" className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-4">
        Gallery
      </h2>
      <InfiniteMovingCards
        items={testimonials.map((t) => t.image)}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    image: (
      <Image
        src="/1.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
  {
    image: (
      <Image
        src="/2.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
  {
    image: (
      <Image
        src="/3.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
  {
    image: (
      <Image
        src="/4.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
  {
    image: (
      <Image
        src="/5.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
  {
    image: (
      <Image
        src="/6.webp"
        alt="Charles Dickens"
        fill
        className="rounded-2xl object-cover"
      />
    ),
  },
];
