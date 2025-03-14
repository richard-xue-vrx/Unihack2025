"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// TODO I reckon upon click we store this non-sensitive config data in local
// That way they can update it if they change their mind and all other
// secure data can be sent to the db

const cards = [
  {
    color: 'bg-red-500',
    title: 'Lover',
    text: 'The algorithm will only match you with other hopeless romantics ♡',
    image: { src: '/heart-icon.svg', alt: 'A heart icon' }
  },
  {
    color: 'bg-blue-500',
    title: 'Friend',
    text: 'Keeping your core values close - we\'ll only match you on platonic vibes.',
    image: { src: '/person-icon.svg', alt: 'A person icon' }
  },
  {
    color: 'bg-green-500',
    title: 'Someone',
    text: 'You\'re not sure? Or want a chance at both? This\'ll put you in compatible pools.',
    image: { src: '/question-icon.svg', alt: 'A question mark icon' }
  },
];

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-2xl">You are looking for a...</div>
      <div className="flex space-x-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
        ))}
      </div>
      <Link href='/home' className="underline underline-offset-2 opacity-60 hover:opacity-100 transition">
        or if you've been here before →
      </Link>
    </div>
  );
}
