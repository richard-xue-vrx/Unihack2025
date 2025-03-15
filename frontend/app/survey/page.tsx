"use client"
import React from "react";

import { AnsweredQuestion, UserData, UserDataContextType, useUserData } from "@/context/UserDataContext";

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
  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        DEPRECRATED TO FIX...
      </main>
    </div>
  );
}
