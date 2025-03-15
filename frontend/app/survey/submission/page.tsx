"use client"
import React from "react";

import { AnsweredQuestion, UserData, UserDataContextType, useUserData } from "@/context/UserDataContext";
import { useRouter } from "next/navigation";


export default function Weightings() {
  const context = useUserData();
  if (!context) return <div>Error: UserDataProvider is missing</div>;
  const { userData, setUserData } = context;

  console.log(userData);

  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">


      </main>
    </div>
  );
}
