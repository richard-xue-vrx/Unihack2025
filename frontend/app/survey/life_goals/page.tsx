"use client"
import React from "react";

import { AnsweredQuestion, UserDataContextType, useUserData } from "@/context/UserDataContext";
import RankingQuestionTemplate from "../RankingQuestionTemplate";
import { Binary, Ranked, Scale, survey } from "@/QuestionTypes";

import { useRouter } from "next/navigation";
import ScaleQuestionTemplate from "../ScaleQuestionTemplate";
import BinaryQuestionTemplate from "../BinaryQuestionTemplate";
import { navigateNextQuestion } from "../helpers";

export default function SurveyLifeGoals() {
  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;
  const [currentQuestion, setCurrentQuestion] = React.useState(survey.sections[userData.up_to_category].questions[userData.up_to_question]);

  const onSubmit = (userAnswer: AnsweredQuestion) => {
    navigateNextQuestion(userAnswer, context, router, setUserData, setCurrentQuestion);
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div className="text-base">
          4. ⭐ Life Goals ⭐
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
