"use client"
import React from "react";
import { Reorder } from "framer-motion";
import Link from "next/link";
import { Grip } from "lucide-react";

const rankedQuestion = {
  question: "On your free day you're most likely to?",
  answers: [
    "📺 Binge-watch a new show",
    "🏋️‍♂️ Hit the gym or go for a hike",
    "📖 Read a book or listen to a podcast",
    "🚀 Go out and explore the city"
  ]
}

const answerCreator = (index: number) => {
  const answer = rankedQuestion.answers[index];
  return (
    <div className="flex items-center border p-4 rounded-md hover:cursor-grab shadow-md bg-white">
      <span className="w-96">{answer}</span>
      <Grip className="ml-auto w-4 text-gray-500"/>
    </div>
  )
}

export default function Test() {
  const [values, setValues] = React.useState([...Array(rankedQuestion.answers.length).keys()]);

  React.useEffect(() => {
    console.log(values.map(index => rankedQuestion.answers[index]));
  }, [values]);

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
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
        <Link href='/home' className="ml-auto underline underline-offset-2 opacity-60 hover:opacity-100 transition">
          Next →
        </Link>
      </main>
    </div>
  );
}
