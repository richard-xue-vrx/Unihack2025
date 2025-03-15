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
  category_weights: {
    personality: undefined,
    morals: undefined,
    interest_hobbies: undefined,
    life_goals: undefined,
    love_languages: undefined,
    lifestyle: undefined,
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
  category_weights: {
    personality: number | undefined,
    morals: number | undefined,
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
