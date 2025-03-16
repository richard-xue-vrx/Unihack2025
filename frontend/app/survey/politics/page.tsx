"use client"
import React from "react";

import { AnsweredQuestion, UserDataContextType, useUserData } from "@/context/UserDataContext";
import RankingQuestionTemplate from "../RankingQuestionTemplate";
import { Binary, Ranked, Scale, survey } from "@/QuestionTypes";

import { useRouter } from "next/navigation";
import ScaleQuestionTemplate from "../ScaleQuestionTemplate";
import BinaryQuestionTemplate from "../BinaryQuestionTemplate";
import { navigateNextQuestion } from "../helpers";

export default function SurveyPolitics() {
  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  const [currentQuestion, setCurrentQuestion] = React.useState(survey.sections[userData.up_to_category].questions[userData.up_to_question]);

  const onSubmit = (userAnswer: AnsweredQuestion) => {
    navigateNextQuestion(userAnswer, context, router, setUserData, setCurrentQuestion);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent">
      <main className="flex flex-col space-y-4 min-w-[480px] max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        <div className="text-base">
          2. ⭐ Politics ⭐
        </div>
          {
              (currentQuestion.type === "RANKED")
            ? <RankingQuestionTemplate rankedQuestion={currentQuestion as Ranked} onSubmit={onSubmit}/>
            : (currentQuestion.type === "SCALE")
            ? <ScaleQuestionTemplate scaleQuestion={currentQuestion as Scale} onSubmit={onSubmit}/>
            : (currentQuestion.type === "BINARY")
            ? <BinaryQuestionTemplate binaryQuestion={currentQuestion as Binary} onSubmit={onSubmit}/>
            : null
          }
      </main>
    </div>
  );
}
