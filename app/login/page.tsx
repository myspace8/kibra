import LogInForm from '../../components/log-in-form'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center max-w-lg h-full mx-auto px-4 sm:px-6 lg:px-8 bg-gray-1 00 text-black">
      <div className="max-w-md w-full space-y-8 md:mt-40 mt-32 p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Log in to Kibra
          </h2>
          <p className="mt-2 text-center text-sm">
            Or{' '}
            <Link href="/signup" className="font-medium text-black hover:underline underline-offset-4">
              create a new account
            </Link>
          </p>
        </div>
        <LogInForm />
      </div>
    </div>
  )
}


