"use client";
import React, { useState } from "react";
import Link from "next/link";

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
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col items-center space-y-6">
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
        <Link href='/home' className="ml-auto underline underline-offset-2 opacity-60 hover:opacity-100 transition">
          Next →
        </Link>
      </main>
    </div>
  );
}
