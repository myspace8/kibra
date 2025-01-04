"use client";
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  checkIfDocumentExists,
  doesUsernameExist,
  getDocumentByFieldValue,
  fetchUsernameByEmail,
} from "@/utils/functions";
import { useRouter } from "next/navigation";
import { auth } from '@/firebase/config';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import toast from 'react-hot-toast'

export default function LogInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const username = await fetchUsernameByEmail(email);
    console.log("Username by email: ", username);

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Handle successful sign-in (e.g., redirect to dashboard)
      router.push(`/${username}`)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('auth/invalid-credential') || error.message.includes('auth/wrong-password') || error.message.includes('auth/user-not-found')) {
          toast.error('Invalid email or password. Please try again.')
        } else {
          toast.error('An error occurred. Please try again later.')
        }
      } else {
        toast.error('An unexpected error occurred. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="email-address" className="sr-only">
            Email address
          </Label>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className="ml-2 block text-sm">
            Remember me
          </Label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-black transition-colors hover:underline underline-offset-4">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
          )}
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>
      </div>
    </form>
  )
}


