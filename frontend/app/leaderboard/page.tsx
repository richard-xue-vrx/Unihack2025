"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface LeaderboardEntry {
  left_initials: string;
  right_initials: string;
  similarity: number;
  is_lover: boolean;
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("http://127.0.0.1:5000/v1/leaderboard");
        const data = await response.json();
        if (data.message === "OK") {
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent relative">
      <main className="flex flex-col space-y-4 min-w-[480px] max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        <div className="text-2xl text-center font-semibold">🏆 Love Leaderboard 🏆</div>
        <div className="text-sm text-center text-gray-500">
          {leaderboard.length === 0 ? (
            <div className="text-center text-gray-500">Matching hasn't happened yet. Come back later!</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              {leaderboard.map((entry, index) => {
                const { left_initials, right_initials, similarity, is_lover } = entry;

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200"
                  >
                    <div className="text-lg font-semibold">
                      {left_initials} ❤️ {right_initials}
                    </div>
                    <div className={`text-sm ${is_lover ? "text-red-500" : "text-yellow-500"}`}>
                      {is_lover ? "Lover 💕" : "Friend 💛"}
                    </div>
                    <div className="font-semibold text-gray-700">
                      {similarity?.toFixed(1)}%
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      <Link
        href="/"
        className="absolute bottom-8 right-8 inline-block text-lg text-white font-medium p-2 rounded-full border-2 border-white hover:bg-white hover:text-indigo-500 transition-all duration-300"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
