import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Scale } from "@/QuestionTypes";
import { AnsweredQuestion } from "@/context/UserDataContext";
import { toast } from "sonner";

export default function ScaleQuestionTemplate({ scaleQuestion, onSubmit }: {
  scaleQuestion: Scale,
  onSubmit: (userAnswer: AnsweredQuestion) => void
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [scaleQuestion]);

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error("Please make a selection before proceeding ❤️", { duration: 1500 });
      return;
    }

    const userAnswer = retrieveAnswer();
    if (userAnswer) onSubmit(userAnswer);
  };

  const retrieveAnswer = () => {
    if (selectedAnswer === null) return;

    const answers = [{ [scaleQuestion.question]: selectedAnswer }];

    return {
      category_name: scaleQuestion.category_name,
      is_self_question: scaleQuestion.is_self_question,
      is_similar_question: scaleQuestion.is_similar_question,
      question_type: scaleQuestion.type,
      question_text: scaleQuestion.question,
      answers: answers
    } as AnsweredQuestion;
  };

  const handleCircleClick = (value: number) => {
    setSelectedAnswer(value === selectedAnswer ? null : value);
    console.log("Selected answer:", value);
  };

  const answersText = scaleQuestion.answers ?? ["Low", "High"]; // Default labels

  return (
    <div className="flex flex-col items-center space-y-6 w-[480px] md:h-[480px] min-w-[360px] max-w-[480px] caret-transparent">
      <div className="text-2xl font-semibold text-center mb-4">
        {scaleQuestion.question}
      </div>
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Left Label */}
        <span className="text-sm text-gray-600 mr-2">{answersText[0]}</span>

        {/* Scale Selection */}
        <div className="flex gap-4">
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

        {/* Right Label */}
        <span className="text-sm text-gray-600 ml-2">{answersText[1]}</span>
      </div>
      <div className="grow">
        {/* spacer */}
      </div>
      <Button onClick={handleSubmit} className="w-fit ml-auto mt-auto select-none">
        Next
      </Button>
    </div>
  );
}
