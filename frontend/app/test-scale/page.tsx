"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const binaryQuestion = {
  question: "How gay are you?",
  answers: []
};

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedAnswer(value === selectedAnswer ? null : value);
    console.log("Selected answer:", value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col items-center space-y-6">
        <div className="text-2xl font-semibold text-center mb-4">
          {binaryQuestion.question}
        </div>
        <div className="flex gap-4 w-full justify-center">
          {/* Render circles with numbers 1 to 5 */}
          {[1, 2, 3, 4, 5].map((number) => (
            <div
              key={number}
              onClick={() => handleCircleClick(number)}
              className={cn(
                "w-12 h-12 flex justify-center items-center rounded-full cursor-pointer transition-colors",
                selectedAnswer === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              )}
              style={{ userSelect: "none" }}
            >
              {number}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/home"
            className={`ml-auto underline underline-offset-2 transition ${selectedAnswer !== null ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ userSelect: 'none' }}
          >
            Next →
          </Link>
        </div>
      </main>
    </div>
  );
}
