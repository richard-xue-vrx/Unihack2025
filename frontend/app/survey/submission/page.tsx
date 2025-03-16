"use client"
import React from "react";

import { useUserData } from "@/context/UserDataContext";
import axios from 'axios';
import { Loader2 } from "lucide-react"

export default function SurveySubmission() {
  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  console.log(userData)

  React.useEffect(() => {
    const submitUserData = async () => {
      axios.post('http://127.0.0.1:5000/v1/surveySubmit', userData)
      .then(function (response) {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if (userData) submitUserData();
  }, []);


  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent">
      <main className="flex flex-col space-y-4 md:w-[480px] md:min-h-[240px] p-4 bg-white rounded-lg shadow-lg">
        {
          (loading)
          ? (
              <div>
                <Loader2 className="animate-spin" />
              </div>
            )
          : (
              <div className="flex flex-col grow">
                <div className="text-2xl">Thanks {userData.first_name}!</div>
                <div className="text-sm">
                  <span>
                      Once we have enough submissions, we'll be sending out everyone's matches via email - you'll get yours at{' '}
                  </span>
                  <span className="text-sky-700">
                    {userData.email}.
                  </span>
                  <br></br>
                  <span>
                    Hope you're just as excited as we are, may love (or friendship) win!
                  </span>
                </div>
                <div className="ml-auto grow flex items-end">
                  <span className="">
                    -  cupid 💘
                  </span>
                </div>
              </div>
            )
        }
      </main>
    </div>
  );
}
