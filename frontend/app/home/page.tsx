"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const card = {
  color: 'bg-red-500',
  title: 'Lover',
  text: 'A quick questionare and we\'ll find your compatible hopeless romantics ♡',
  image: { src: '/heart-icon.svg', alt: 'A heart icon' }
}

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-2xl">If you're looking for a...</div>
      <div className="flex space-x-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className={`select-none hover:cursor-pointer overflow-hidden relative py-2 px-4 w-56 h-80 ${card.color} flex flex-col text-white text-2xl rounded-lg`}
        >
          <div className="text-4xl font-extrabold">
            {card.title}
          </div>
          <div className="text-base flex-grow">
            {card.text}
          </div>
          <Image
            src={card.image.src}
            alt={card.image.alt}
            width={164}
            height={164}
            className="absolute bottom-20 right-20 translate-x-1/2 translate-y-1/2"
          />
        </motion.div>
      </div>
      <Link href='/onboarding' className="underline underline-offset-2 opacity-60 hover:opacity-100 transition">
        Get started →
      </Link>
    </div>
  );
}
