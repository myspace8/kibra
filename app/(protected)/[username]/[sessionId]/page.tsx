"use client";

import React from "react";
import { auth } from "@/firebase/config";
import QuizView from "@/components/MainQuizView";
import { useQuestionsBySessionId } from "@/hooks/use-questions-by-sessionid";
import { usePathname } from "next/navigation";

export default function MainSessionPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const user = auth.currentUser;
  const pathname = usePathname();

  // Extract username from the URL
  const match = pathname.match(/^\/([^/]+)\//);
  const username = match ? match[1] : null;

  const { question: questions, isLoading, isError } = useQuestionsBySessionId(sessionId || "");

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl md:text-2xl">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl md:text-2xl">Error loading sessions. Please try again later.</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl md:text-2xl">No questions found for this session.</p>
      </div>
    );
  }

  return (
    <>
      <QuizView
        sessionId={sessionId}
        questions={questions}
        userId={user?.uid}
        username={username} // Pass the username to QuizView
      />
    </>
  );
}
