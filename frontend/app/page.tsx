"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const messages = [
  "Hey there, lovebird! ❤️",
  "Before we begin, let me ask you something...",
  "Are you ready to find your perfect match? 😏",
  "Let’s get started!"
];

const options = [
  { text: "Yes, I’m ready!", response: "Great! Let’s dive in!" },
  { text: "Not sure, tell me more.", response: "No worries! It's just a quiz." }
];

export default function Home() {
  const [shaking, setShaking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [canProceed, setCanProceed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [userResponse] = useState(null);

  const handleClick = () => {
    if (!showChat) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setShowChat(true);
      }, 600);
    }
  };

  const handleOptionClick = (response: string) => {
    setChatMessages((prev) => [...prev, response]);
    setShowOptions(false);
    setTimeout(() => setCanProceed(true), 1000);
  };

  useEffect(() => {
    if (showChat) {
      let i = 0;
      const interval = setInterval(() => {
        setChatMessages((prev) => [...prev, messages[i - 1]]);
        i++;
        console.log(i)
        if (i === messages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setShowOptions(true);
          }, 3000);
        }
      }, 2000);
    }
  }, [showChat]);

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col max-w-[360px]">
        <h1 className="text-3xl">Some awesome name</h1>
        <div className="text-base text-muted-foreground">
          Some description of what you&apos;re trying to do... yap yap yap
        </div>
        <motion.button
          onClick={handleClick}
          className="mt-16 flex justify-end underline underline-offset-2 opacity-60 hover:opacity-100 transition"
          animate={shaking ? { x: [-40, 40, -40, 40, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          Get Started <ArrowUpRight />
        </motion.button>
      </main>
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-5 right-5 w-64 bg-white p-4 rounded-lg shadow-lg"
        >
          <div className="font-bold">💘 Cupid</div>
          <div className="mt-2 space-y-2">
            {chatMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.5 }}
                className="bg-pink-100 text-black p-2 rounded-md"
              >
                {msg}
              </motion.div>
            ))}
          </div>
          {showOptions && !userResponse && (
            <div className="mt-4 space-y-2">
              {options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(option.response)}
                  className="w-full text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-md p-2"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          )}
          {canProceed && (
            <Link
              href="/home"
              className="block mt-4 text-blue-500 text-center font-semibold"
            >
              Continue → 
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
