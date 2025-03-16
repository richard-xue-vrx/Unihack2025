"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Card design object
const card = {
  color: 'bg-pink-600',
  title: 'Lover',
  text: 'A quick questionnaire and we\'ll find your compatible hopeless romantics ♡',
  image: { src: '/heart-icon.svg', alt: 'A heart icon' }
}

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8">
      <div className="text-2xl text-white font-semibold mb-4">
        If you're looking for a...
      </div>

      <div className="flex space-x-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className={`select-none hover:cursor-pointer overflow-hidden relative py-4 px-6 w-64 h-96 ${card.color} flex flex-col text-white text-2xl rounded-2xl shadow-xl`}
        >
          <div className="text-4xl font-extrabold mb-4">
            {card.title}
          </div>
          <div className="text-base flex-grow mb-6">
            {card.text}
          </div>
          <Image
            src={card.image.src}
            alt={card.image.alt}
            width={164}
            height={164}
            className="absolute bottom-6 right-6 translate-x-1/2 translate-y-1/2"
          />
        </motion.div>
      </div>

      <Link
        href='/survey/onboarding'
        className="underline underline-offset-4 text-lg text-white opacity-80 hover:opacity-100 transition-all duration-300 mt-6"
      >
        Get started →
      </Link>
    </div>
  );
}
