"use client"
import React from "react";
import { Reorder } from "framer-motion";
import { Grip } from "lucide-react";
import { Ranked } from "@/QuestionTypes";
import { Button } from "@/components/ui/button";
import { AnsweredQuestion } from "@/context/UserDataContext";

export default function RankingQuestionTemplate({ rankedQuestion, onSubmit } : {
  rankedQuestion: Ranked,
  onSubmit: (userAnswer: AnsweredQuestion) => void
}) {
  // Format the answer into the AnsweredQuestion structure
  const retrieveAnswer = () => {
    const answers: { [key: string]: number }[] = [];

    values.forEach((value, order) => {
      // number here is normalised from 0 - 10
      // So we (10 / rankedQuestion.answers.length) * (rankedQuestion.answers.length - order)
      const score = (10 / rankedQuestion.answers.length) * (rankedQuestion.answers.length - order);
      answers.push({[rankedQuestion.answers[value]]: score})
    })

    const userAnswer: AnsweredQuestion = {
      category_name: rankedQuestion.category_name,
      is_self_question: rankedQuestion.is_self_question,
      is_similar_question: rankedQuestion.is_similar_question,
      question_type: rankedQuestion.type,
      question_text: rankedQuestion.question,
      answers: answers
    }

    return userAnswer;
  }

  const [values, setValues] = React.useState([...Array(rankedQuestion.answers.length).keys()]);

  const answerCreator = (index: number) => {
    const answer = rankedQuestion.answers[index];
    return (
      <div className="flex items-center border p-4 rounded-md hover:cursor-grab shadow-md bg-white">
        <span className="w-96">{answer}</span>
        <Grip className="ml-auto w-4 text-gray-500"/>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 w-[480px] md:h-[480px] min-w-[360px] max-w-[480px] caret-transparent">
      <div className="text-2xl">
        {rankedQuestion.question}
      </div>
      <div className="flex flex-col gap-2 rounded-md">
        <div className="text-center opacity-60">most</div>
        <Reorder.Group className="w-full space-y-2" axis="y" values={values} onReorder={setValues}>
          {values.map((value, index) => (
            <Reorder.Item
              key={value} value={value}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {answerCreator(value)}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div className="text-center opacity-60">least</div>
      </div>
      <div className="grow">
        {/* spacer */}
      </div>
      <Button onClick={() => onSubmit(retrieveAnswer())} className="w-fit ml-auto mt-auto select-none">Next</Button>
    </div>
  );
}
