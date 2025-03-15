'use client'
import React from 'react';
import { Category } from '@/QuestionTypes';

const defaultUserData: UserData = {
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  age: undefined,
  gender: undefined,
  sexuality: undefined,
  up_to_category: 0,
  up_to_question: 0,
  category_weights: {
    personality: 0,
    morals: 0,
    politics: 0,
    interest_hobbies: 0,
    life_goals: 0,
    love_languages: 0,
    lifestyle: 0,
  },
  questions: [],
};

export interface AnsweredQuestion {
  category_name: Category,
  type: "RANKED" | "SCALE" | "BINARY"
  is_self_question: boolean,
  is_similar_question: boolean,
  question: string,
  // SCALE  key: (same as question string), value: number (1 - 5)
  // BINARY key: (answer), value: number (1 for selected, 0 for not)
  // RANKED key: (ranked selection), value: number (normalised value from 1 - 10)
  answers: { [key: string]: number }[];
}

export interface UserData {
  email: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined,
  age: number | undefined,
  gender: string | undefined,
  sexuality: string | undefined,
  up_to_category: number, // category index
  up_to_question: number, // question index within category
  category_weights: {
    personality: number | undefined,
    morals: number | undefined,
    politics: number | undefined,
    interest_hobbies: number | undefined,
    life_goals: number | undefined,
    love_languages: number | undefined,
    lifestyle: number | undefined,
  },
  questions: AnsweredQuestion[]
}


export interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}
const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

export const UserDataContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userData, setUserData] = React.useState<UserData>(defaultUserData);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => React.useContext(UserDataContext);
