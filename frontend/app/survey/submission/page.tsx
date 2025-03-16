"use client"
import React from "react";

import { useUserData } from "@/context/UserDataContext";
import axios from 'axios';
export default function SurveySubmission() {
  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  console.log(userData)

  React.useEffect(() => {
    const submitUserData = async () => {
      axios.post('http://localhost:5000/v1/surveySubmit', userData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if (userData) {
      submitUserData();
    }
  }, [userData]);


  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div>
          Questions answered: {userData.questions.length}
        </div>
        <div>
          {JSON.stringify(userData.questions)}
        </div>
      </main>
    </div>
  );
}
