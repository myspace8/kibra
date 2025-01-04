"use client";

import Link from "next/link";
import { useAllSessions } from "@/hooks/useSessions";


export default function AllSessions({ params }:any) {
    const { sessions, isLoading, isError } = useAllSessions();
  const { username } = params;


    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error fetching sessions</p>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Sessions</h1>
            <div className="space-y-12">
                {sessions.map((session) => (
                    <Link
                        href={`/${username}/${session.sessionId}`}
                        key={session.sessionId}
                        className="block group"
                    >
                        <div className="bg-zinc-900 rounded-2xl p-6 transition-transform transform hover:scale-105">
                            <div className="fle items-start space-x-6">
                                <div className="flex-grow">
                                    <h2 className="md:text-xl font-bold mb-2">{session.sessionTitle}</h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
