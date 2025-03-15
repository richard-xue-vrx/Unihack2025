"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const scaleQuestion = {
  question: "How gay are you?",
  answers: []
};

export default function ScaleQuestionTemplate() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedAnswer(value === selectedAnswer ? null : value);
    console.log("Selected answer:", value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col items-center space-y-6">
        <div className="text-2xl font-semibold text-center mb-4">
          {scaleQuestion.question}
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
        <Button onClick={() => onSubmit(retrieveAnswer())} className="w-fit ml-auto">Next</Button>
      </main>
    </div>
  );
}
