"use client"
import React from "react";
import Link from "next/link";

import { AnsweredQuestion, UserData, UserDataContextType, useUserData } from "@/context/UserDataContext";
import { Button } from "@/components/ui/button";

const addQuestionAnswer = (answeredQuestion: AnsweredQuestion, context: UserDataContextType) => {
  const { userData, setUserData } = context;
  const newUserData = JSON.parse(JSON.stringify(userData));
  newUserData.questions.push(answeredQuestion);
  setUserData(newUserData);
}

export default function Survey() {
  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  const handleAddQuestionAnswer = () => {
    addQuestionAnswer({
      category_name: "life_goals",
      type: "BINARY",
      is_self_question: true,
      is_similar_question: true,
      question: "some question that we add",
      answers: [{
        answer1: 1,
        answer2: 0,
      }]
    }, context)
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div>
          Answers Submitted: {userData.questions.length}
        </div>
        <Button onClick={() => handleAddQuestionAnswer()}>Add Example Answer</Button>
        <div className="text-2xl">
          This is where the question goes
        </div>
        <div className="flex flex-col gap-2 rounded-md">
          This is where the form goes
        </div>
        <Link href='/home' className="ml-auto underline underline-offset-2 opacity-60 hover:opacity-100 transition">
          Next →
        </Link>
      </main>
    </div>
  );
}
