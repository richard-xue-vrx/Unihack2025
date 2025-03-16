"use client";
import React from "react";

export default function AboutUs() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8 caret-transparent">
      <main className="flex flex-col space-y-8 min-w-[360px] max-w-[760px] p-6 bg-white rounded-lg shadow-lg">
        {/* Title */}
        <div className="text-4xl font-bold text-center text-gray-800">
          About Us 💖
        </div>

        {/* Section 1: Mission */}
        <section className="space-y-4">
          <div className="text-2xl font-semibold text-gray-700">Our Mission 🎯</div>
          <p className="text-lg text-gray-600">
            At Cupid, we believe in the power of love and connection. Our mission is to bring hopeless romantics together with compatible partners through thoughtful questionnaires and intelligent matchmaking algorithms. We're dedicated to helping you find meaningful connections that lead to lasting relationships.
          </p>
        </section>

        {/* Section 2: Our Story */}
        <section className="space-y-4">
          <div className="text-2xl font-semibold text-gray-700">Our Story 📖</div>
          <p className="text-lg text-gray-600">
            What started as a simple idea to match people based on their passions and personalities quickly grew into something bigger. Our team of dreamers and doers combined their expertise in technology, psychology, and relationship building to create a platform that’s more than just about swiping left or right – it's about fostering real connections. Every match at Cupid is thoughtfully crafted to ensure a genuine, fulfilling bond.
          </p>
        </section>

        <section className="text-center">
          <p className="text-lg text-gray-600 mb-4 py-4">
            Ready to find your match? We’re here to help you on your journey toward love. Take our quick questionnaire!
          </p>
          <a
            href="/survey/onboarding"
            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
          >
            Get Started 🚀
          </a>
        </section>
      </main>
    </div>
  );
}
