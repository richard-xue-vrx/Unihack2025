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
  return newUserData;
}

export default function SurveyLifestyle() {
  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;


  const [currentQuestion, setCurrentQuestion] = React.useState(survey.sections[userData.up_to_category].questions[userData.up_to_question]);

  const onSubmit = (userAnswer: AnsweredQuestion) => {
    const newUserData = addQuestionAnswer(userAnswer, context);
    const curQuestionIndex = newUserData.up_to_question;
    const curCategoryIndex = newUserData.up_to_category;

    if (curQuestionIndex + 1 >= survey.sections[curCategoryIndex].questions.length) {
      newUserData.up_to_question = 0;
      newUserData.up_to_category = newUserData.up_to_category + 1;
      setUserData(newUserData);
      router.push(`/survey/${survey.sections[newUserData.up_to_category].category}`)
    } else {
      newUserData.up_to_question = newUserData.up_to_question + 1;
      setUserData(newUserData);
      setCurrentQuestion(survey.sections[newUserData.up_to_category].questions[newUserData.up_to_question]);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div className="text-base">
          2. ⭐ Life Style ⭐
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
