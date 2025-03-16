"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const messages = [
  "Hey there, lovebird!",
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8">
      <main className="flex flex-col max-w-[360px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-center text-blue-800 mb-4">
          Cupid&apos;s Arrow 💘
        </h1>
        <div className="text-lg text-muted-foreground text-center mb-8">
          Looking for your perfect match? Think of us as Cupid’s little helper—connecting hearts, one match at a time! 💑 Let&apos;s get started on this love journey! 💫
        </div>
        <motion.button
          onClick={handleClick}
          className="mt-8 py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          animate={shaking ? { x: [-40, 40, -40, 40, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          Get Started
        </motion.button>

        <div className="mt-8 text-center space-x-4">
          <Link href="/leaderboard" className="text-blue-600 font-semibold hover:underline">
            🏆 Leaderboard
          </Link>
          <Link href="/about_us" className="text-blue-600 font-semibold hover:underline">
            ℹ️ About Us
          </Link>
        </div>
      </main>

      {showChat && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed bottom-5 right-5 w-[360px] max-h-[500px] bg-white p-4 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
  >
    {/* Cupid Header Box */}
    <div className="bg-pink-600 text-white text-xl font-semibold py-2 px-4 rounded-t-2xl">
      💘 Cupid
    </div>

    {/* Chat messages area with different color below Cupid */}
    <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-pink-50"> {/* Added bg-pink-50 */}
      {chatMessages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
          className="bg-pink-100 text-black p-3 rounded-lg max-w-[80%]"
        >
          {msg}
        </motion.div>
      ))}
    </div>

    {/* Options section with different color */}
    {showOptions && !userResponse && (
      <div className="mt-4 space-y-2 bg-blue-50 p-4 rounded-lg"> {/* Added bg-blue-50 */}
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option.response)}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-3"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    )}

    {/* Continue link with a different color */}
    {canProceed && (
      <Link
        href="/home"
        className="block mt-4 text-blue-600 text-center font-semibold"
      >
        Continue → 
      </Link>
    )}
  </motion.div>
)}

    </div>
  );
}
