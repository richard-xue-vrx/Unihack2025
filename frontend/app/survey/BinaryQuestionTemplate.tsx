"use client";
import React, { useState, useEffect } from "react";
import { Binary } from "@/QuestionTypes";
import { AnsweredQuestion } from "@/context/UserDataContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BinaryQuestionTemplate({
  binaryQuestion,
  onSubmit,
}: {
  binaryQuestion: Binary;
  onSubmit: (userAnswer: AnsweredQuestion) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Reset selected answer when the binaryQuestion changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [binaryQuestion]);

  const handleSubmit = () => {
    const answer = retrieveAnswer();
    if (answer) onSubmit(answer);
  };

  const retrieveAnswer = () => {
    const answers: { [key: string]: number }[] = [];

    if (selectedAnswer === null) {
      toast.error("Please make a selection before proceeding ❤️", { duration: 1500 });
      return;
    }

    binaryQuestion.answers.forEach((answer) => {
      if (answer === selectedAnswer) answers.push({ [answer]: 1 });
      if (answer !== selectedAnswer) answers.push({ [answer]: 0 });
    });

    const userAnswer: AnsweredQuestion = {
      category_name: binaryQuestion.category_name,
      is_self_question: binaryQuestion.is_self_question,
      is_similar_question: binaryQuestion.is_similar_question,
      question_type: binaryQuestion.type,
      question_text: binaryQuestion.question,
      answers: answers,
    };

    return userAnswer;
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer === answer) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answer);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-[480px] md:h-[480px] min-w-[360px] max-w-[480px] caret-transparent grow">
      <div className="text-2xl font-semibold text-center mb-4">
        {binaryQuestion.question}
      </div>
      <div className="flex gap-4 w-full">
        {binaryQuestion.answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`w-1/2 h-40 text-lg my-auto flex justify-center items-center p-4 rounded-lg border cursor-pointer transition ${
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
      <div className="grow">
        {/* spacer */}
      </div>
      <Button onClick={handleSubmit} className="w-fit mt-auto ml-auto select-none">Next</Button>

    </div>
  );
}
