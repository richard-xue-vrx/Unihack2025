"use client"
import React from "react";

import { AnsweredQuestion, UserData, UserDataContextType, useUserData } from "@/context/UserDataContext";
import ScaleQuestionTemplate from "../ScaleQuestionTemplate";
import { Scale } from "@/QuestionTypes";
import { useRouter } from "next/navigation";

const weightingTypes = ["personality", "morals", "politics", "interest_hobbies", "life_goals", "love_languages", "lifestyle"];
const weightingScaleQuestions = weightingTypes.map(weight => {
  const scaleQuestionAbuse: Scale = {
    category_name: "lifestyle",
    type: "SCALE",
    is_self_question: true,
    is_similar_question: true,
    question: `How important is ${weight} to you?`,
    answers: []
  }
  return scaleQuestionAbuse;
})

export default function Weightings() {
  const router = useRouter();

  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;

  const { userData, setUserData } = context;

  const [index, setIndex] = React.useState(0);
  const [theirWeights, setTheirWeights] = React.useState<number[]>([]);

  const onSubmit = (userAnswer: AnsweredQuestion) => {
    const ans = userAnswer.answers[0][weightingScaleQuestions[index].question];
    const newArr = [...theirWeights];
    newArr.push(ans);

    setTheirWeights(newArr);
    if (index + 1 < weightingTypes.length) {
      setIndex(index + 1);
    } else {
      userData.category_weights.personality = newArr[0];
      userData.category_weights.morals = newArr[1];
      userData.category_weights.politics = newArr[2];
      userData.category_weights.interest_hobbies = newArr[3];
      userData.category_weights.life_goals = newArr[4];
      userData.category_weights.love_languages = newArr[5];
      userData.category_weights.lifestyle = newArr[6];

      setUserData(userData);

      router.push('/survey/submission');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent">
      <main className="flex flex-col space-y-4 min-w-[480px] max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        <ScaleQuestionTemplate scaleQuestion={weightingScaleQuestions[index]} onSubmit={onSubmit}/>
      </main>
    </div>
  );
}
