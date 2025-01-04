"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { useSessionByUid } from "@/hooks/use-session-by-uid";
import { ArrowRight } from "lucide-react";
import { doesSubcollectionExist } from "@/utils/functions";
import Modal from "@/components/session-modal"; // Ensure you have a reusable Modal component

export default function MySessions({ params }: any) {
  const [enrichedSessions, setEnrichedSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null); // To track the selected session for the modal
  const [showFullNote, setShowFullNote] = useState(false); // Track whether to show the full lesson note


  const user = auth.currentUser;

  const { username } = params;
  const { session: sessions, isLoading, isError } = useSessionByUid(user?.uid || "");

  // Check subcollection existence and enrich sessions
  const enrichSessionsWithQuestions = async () => {
    if (!sessions) {
      console.warn("No sessions available to enrich.");
      return [];
    }

    return await Promise.all(
      sessions.map(async (session) => {
        if (!session.sessionId) {
          console.error("Missing session ID for session:", session);
          return { ...session, numberOfQuestions: "Unknown" };
        }

        try {
          const hasQuestions = await doesSubcollectionExist(session.sessionId);
          return {
            ...session,
            numberOfQuestions: hasQuestions ? session.numberOfQuestions || "Available" : "None",
          };
        } catch (error) {
          console.error("Error checking questions subcollection:", error);
          return { ...session, numberOfQuestions: "Error checking" };
        }
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedSessions = await enrichSessionsWithQuestions();
      setEnrichedSessions(updatedSessions);
    };

    fetchData();
  }, [sessions]);

  const handleModalClose = () => {
    setSelectedSession(null);
    setShowFullNote(false); // Reset the show more state when closing
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl md:text-2xl">Loading... {user?.uid}</p>
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

  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl md:text-2xl">No sessions found for this user.</p>
      </div>
    );
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit ? `${words.slice(0, wordLimit).join(" ")}...` : text;
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">My Sessions</h1>
      <div className="space-y-12">
        {enrichedSessions.map((session) => {
          const createdAt = session.createdAt?.toDate().toLocaleDateString("en-US") || "Unknown";

          return (
            <div
              key={session.sessionId}
              className="block group bg-zinc-900 rounded-2xl p-6 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedSession(session)}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-grow">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{session.sessionTitle}</h2>
                  <p className="text-sm text-gray-400">
                    Number of Questions: {session.numberOfQuestions}
                  </p>
                  <p className="text-sm text-gray-400">Created At: {createdAt}</p>
                </div>
                <ArrowRight className="text-zinc-400 mt-2" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedSession && (
        <Modal isOpen={!!selectedSession} onClose={handleModalClose}>
          <h2 className="text-2xl font-bold mb-4">{selectedSession.sessionTitle}</h2>
          <p className="text-gray-600 mb-4 max-h-[60vh] overflow-auto">
            {showFullNote
              ? selectedSession.lessonNote || "No lesson note available."
              : truncateText(selectedSession.lessonNote || "No lesson note available.", 50)}
          </p>
          {selectedSession.lessonNote?.split(" ").length > 50 && (
            <button
              onClick={() => setShowFullNote(!showFullNote)}
              className="text-blue-500 underline"
            >
              {showFullNote ? "Show Less" : "Show More"}
            </button>
          )}
          <div className="mt-6">
            <Link
              href={`/${params.username}/${selectedSession.sessionId}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Start Session
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}
