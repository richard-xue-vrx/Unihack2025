"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);

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
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-2xl">🏆 Love Leaderboard</div>
      <div className="w-96">
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-500">Loading leaderboard...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {leaderboard.map((entry, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="text-lg font-bold">
                  {entry[0]} & ❤️ & {entry[1]}
                </div>
                <div className="text-sm">
                  {entry[2] ? "Lover 💕" : "Friend 💛"}
                </div>
                <div className="font-semibold">{entry[3]}%</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
