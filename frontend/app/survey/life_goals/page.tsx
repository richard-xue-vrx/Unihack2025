"use client"
import React from "react";

import { AnsweredQuestion, UserDataContextType, useUserData } from "@/context/UserDataContext";
import RankingQuestionTemplate from "../RankingQuestionTemplate";
import { Binary, Ranked, Scale, survey } from "@/QuestionTypes";

import { useRouter } from "next/navigation";
import ScaleQuestionTemplate from "../ScaleQuestionTemplate";
import BinaryQuestionTemplate from "../BinaryQuestionTemplate";

const addQuestionAnswer = (answeredQuestion: AnsweredQuestion, context: UserDataContextType) => {
  const { userData, setUserData } = context;
  const newUserData = JSON.parse(JSON.stringify(userData));
  newUserData.questions.push(answeredQuestion);
  setUserData(newUserData);
}

export default function SurveyLifeGoals() {
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
      userData.up_to_question = 0;
      userData.up_to_category = userData.up_to_category + 1;
      setUserData(userData);
      router.push(`/survey/weightings`)
    } else {
      userData.up_to_question = userData.up_to_question + 1;
      setUserData(userData);
      setCurrentQuestion(survey.sections[userData.up_to_category].questions[userData.up_to_question])
    }
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div className="text-base">
          5. ⭐ Life Goals ⭐
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
