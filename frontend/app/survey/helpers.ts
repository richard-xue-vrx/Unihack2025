// Colocated with all the survey subpages to navigate between questions and categories

import { AnsweredQuestion, UserData, UserDataContextType } from "@/context/UserDataContext";
import { Question, survey } from "@/QuestionTypes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const addQuestionAnswer = (answeredQuestion: AnsweredQuestion, context: UserDataContextType) => {
  const { userData, setUserData } = context;
  const newUserData = JSON.parse(JSON.stringify(userData));
  newUserData.questions.push(answeredQuestion);
  setUserData(newUserData);

  console.log(newUserData.questions.length);

  return newUserData;
}

export const navigateNextQuestion = (
  userAnswer: AnsweredQuestion,
  context: UserDataContextType,
  router: AppRouterInstance,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  setCurrentQuestion: (value: React.SetStateAction<Question>) => void
) => {
  const newUserData = addQuestionAnswer(userAnswer, context);
  const curQuestionIndex = newUserData.up_to_question;
  const curCategoryIndex = newUserData.up_to_category;

  if (curQuestionIndex + 1 >= survey.sections[curCategoryIndex].questions.length) {
    newUserData.up_to_question = 0;

    if (newUserData.up_to_category + 1 < survey.sections.length) {
      newUserData.up_to_category = newUserData.up_to_category + 1;
      console.log(newUserData.up_to_category)
      router.push(`/survey/${survey.sections[newUserData.up_to_category].category}`);
    } else {
      console.log('IS THIS RUNNING');
      router.push(`/survey/weightings`);
      console.log('Am i at the right place');
    }
    setUserData(newUserData);
  } else {
    newUserData.up_to_question = newUserData.up_to_question + 1;
    setUserData(newUserData);
    setCurrentQuestion(survey.sections[newUserData.up_to_category].questions[newUserData.up_to_question]);
  }
}
