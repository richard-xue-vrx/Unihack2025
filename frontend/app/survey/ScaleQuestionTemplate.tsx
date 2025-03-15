"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Scale } from "@/QuestionTypes";
import { AnsweredQuestion } from "@/context/UserDataContext";

export default function ScaleQuestionTemplate({ scaleQuestion, onSubmit } : {
  scaleQuestion: Scale,
  onSubmit: (userAnswer: AnsweredQuestion) => void
}) {
  const handleSubmit = () => {
    const userAnswer = retrieveAnswer();
    if (userAnswer) onSubmit(userAnswer);
  }

  // Format the answer into the AnsweredQuestion structure
  const retrieveAnswer = () => {
    const answers: { [key: string]: number }[] = [];
    // TODO toast an error
    if (selectedAnswer === null) return;
    answers.push({[scaleQuestion.question]: selectedAnswer});

    const userAnswer: AnsweredQuestion = {
      category_name: scaleQuestion.category_name,
      is_self_question: scaleQuestion.is_self_question,
      is_similar_question: scaleQuestion.is_similar_question,
      question_type: scaleQuestion.type,
      question_text: scaleQuestion.question,
      answers: answers
    }

    return userAnswer;
  }

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedAnswer(value === selectedAnswer ? null : value);
    console.log("Selected answer:", value);
  };

  return (
      <div className="flex flex-col items-center space-y-6 min-w-[360px] max-w-[480px]">
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
        <Button onClick={handleSubmit} className="w-fit ml-auto">Next</Button>
      </div>
  );
}
