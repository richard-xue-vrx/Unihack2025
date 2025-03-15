"use client"
import React from "react";

import { AnsweredQuestion, UserDataContextType, useUserData } from "@/context/UserDataContext";
import RankingQuestionTemplate from "../RankingQuestionTemplate";
import { Ranked, survey } from "@/QuestionTypes";

import { useRouter } from "next/navigation";

const addQuestionAnswer = (answeredQuestion: AnsweredQuestion, context: UserDataContextType) => {
  const { userData, setUserData } = context;
  const newUserData = JSON.parse(JSON.stringify(userData));
  newUserData.questions.push(answeredQuestion);
  setUserData(newUserData);
}

export default function SurveyPersonality() {
  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;
  const [currentQuestion, setCurrentQuestion] = React.useState(survey.sections[userData.up_to_category].questions[userData.up_to_question]);

  const onSubmit = (userAnswer: AnsweredQuestion) => {
    addQuestionAnswer(userAnswer, context);
    const curQuestionIndex = userData.up_to_question;
    const curCategoryIndex = userData.up_to_category;

    if (curQuestionIndex + 1 >= survey.sections[curCategoryIndex].questions.length) {
      // Route them to the new category if there are no more questions
      userData.up_to_question = 0;
      userData.up_to_category = userData.up_to_category + 1;
      setUserData(userData);
      router.push(`/survey/${survey.sections[userData.up_to_category].category}`);
    } else {
      // Route them to the next question
      userData.up_to_question = userData.up_to_question + 1;
      setUserData(userData);
      setCurrentQuestion(survey.sections[userData.up_to_category].questions[userData.up_to_question]);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div className="text-base">
          1. ⭐ Personality Questions ⭐
        </div>
          {
              (currentQuestion.type === "RANKED")
            ? <RankingQuestionTemplate rankedQuestion={currentQuestion as Ranked} onSubmit={onSubmit}/>
            : (currentQuestion.type === "SCALE")
            ? <RankingQuestionTemplate rankedQuestion={currentQuestion as Ranked} onSubmit={onSubmit}/>
            : null
          }
      </main>
    </div>
  );
}
