"use client";

import { useState } from "react";
import { createSessionWorkflow } from "@/utils/session-workflow";
import Link from "next/link";

export default function AddSession({ params }: { params: { username: string } }) {
  const [formData, setFormData] = useState({
    sessionTitle: "",
    lessonNote: "",
    numberOfQuestions: 7,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { username } = params;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { sessionTitle, lessonNote, numberOfQuestions } = formData;
    if (!sessionTitle || !lessonNote) {
      setMessage("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setMessage("Creating session...");

    try {
      const resultMessage = await createSessionWorkflow(sessionTitle, lessonNote, +numberOfQuestions);
      setMessage(resultMessage);
    } catch (error:any) {
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-black">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-xl font-bold text-center">Create a New Session</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-700">
              Session Title
            </label>
            <input
              id="sessionTitle"
              name="sessionTitle"
              type="text"
              value={formData.sessionTitle}
              onChange={handleChange}
              placeholder="e.g., The Nervous System"
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700">
              Number of Questions
            </label>
            <input
              id="numberOfQuestions"
              name="numberOfQuestions"
              type="number"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lessonNote" className="block text-sm font-medium text-gray-700">
              Lesson Note
            </label>
            <textarea
              id="lessonNote"
              name="lessonNote"
              value={formData.lessonNote}
              onChange={handleChange}
              placeholder="Write or paste your note here..."
              className="w-full min-h-52 px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Adding..." : "Generate"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-green-500">{message}</p>}
      </div>
    </div>
  );
}
