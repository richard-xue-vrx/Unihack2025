"use client"
import React from "react";

import { useUserData } from "@/context/UserDataContext";

export default function SurveySubmission() {
  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        {JSON.stringify(userData)}
      </main>
    </div>
  );
}
