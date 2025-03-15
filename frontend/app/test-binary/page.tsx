"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactPlayer from 'react-player';

const binaryQuestion = {
  question: "Which situation sounds more fun?",
  answers: [
    "🚗 A last-minute road trip to somewhere new",
    "🏡 A cozy night at home with a plan in place",
  ]
};

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer === answer) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answer);
    }
    console.log("Selected answer:", answer);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <main className="flex flex-col items-center space-y-6 w-full">
        <div className="text-2xl font-semibold text-center mb-4">
          {binaryQuestion.question}
        </div>
        <div className="flex gap-4 w-full">
          {binaryQuestion.answers.map((answer, index) => (
            <div
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`w-1/2 h-40 text-lg flex justify-center items-center p-4 rounded-lg border cursor-pointer transition ${
                selectedAnswer === answer
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              style={{
                userSelect: "none",
                cursor: "pointer",
              }}
            >
              <span>{answer}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/home"
            className={`ml-auto underline underline-offset-2 transition ${selectedAnswer ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ userSelect: 'none' }}
          >
            Next →
          </Link>
        </div>
      </main>
      
      {/* Subway Surfer video at the bottom */}
      <div className="absolute bottom-0 w-full">
        <ReactPlayer 
          url="https://www.youtube.com/watch?v=zZ7AimPACzc"  // Replace with an actual Subway Surfer gameplay video URL
          playing
          loop
          muted
          width="100%"
          height="400px" // Adjust the height as needed
        />
      </div>
    </div>
  );
}
