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
  console.log(userData);

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
      userData.category_weights.personality = theirWeights[0];
      userData.category_weights.morals = theirWeights[1];
      userData.category_weights.politics = theirWeights[2];
      userData.category_weights.interest_hobbies = theirWeights[3];
      userData.category_weights.life_goals = theirWeights[4];
      userData.category_weights.love_languages = theirWeights[5];
      userData.category_weights.lifestyle = theirWeights[6];
      setUserData(userData);

      router.push('/survey/submission');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
      <ScaleQuestionTemplate scaleQuestion={weightingScaleQuestions[index]} onSubmit={onSubmit}/>
      </main>
    </div>
  );
}
