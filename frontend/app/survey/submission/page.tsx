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
      axios.post('http://127.0.0.1:5000/v1/surveySubmit', userData)
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
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent">
      <main className="flex flex-col space-y-4 min-w-[480px] max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        {JSON.stringify(userData)}
      </main>
    </div>
  );
}
