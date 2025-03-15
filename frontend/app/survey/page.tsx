"use client"
import React from "react";
import Link from "next/link";

export default function Survey() {
  return (
    <div className="flex justify-center items-center h-screen gap-8">
      <main className="flex flex-col space-y-4 min-w-[360px] max-w-[480px]">
        <div className="text-2xl">
          This is where the question goes
        </div>
        <div className="flex flex-col gap-2 rounded-md">
          This is where the form goes
        </div>
        <Link href='/home' className="ml-auto underline underline-offset-2 opacity-60 hover:opacity-100 transition">
          Next →
        </Link>
      </main>
    </div>
  );
}
