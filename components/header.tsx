"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="text-black p-4 shadow-md flex justify-between items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl uppercase font-bold">Kibra</h1>
        <div>
          {isSignedIn ? (
            <button
              onClick={handleSignOut}
              className="text-red-500 px-4 py-2 rounded hover:underline underline-offset-4"
            >
              Sign Out
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                href="/login"
                className="text-blue-500 hover:underline underline-offset-4"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-blue-500 hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
