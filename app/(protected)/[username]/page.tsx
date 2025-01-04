import Link from 'next/link';

export default function DashboardPage({ params }: any) {
  const { username } = params;
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className='flex flex-col gap-4'>
      <Link href={`${username}/all-sessions`} className='text-blue-500 w-fit hover:underline underline-offset-4'>All Sessions</Link>
      <Link 
      href={`${username}/create-session`}
          className="text-blue-500 w-fit hover:underline underline-offset-4"
        >
          Create New Session
        </Link>
      <Link href={`${username}/sessions`} className='text-blue-500 w-fit hover:underline underline-offset-4'>My Sessions</Link>
      <Link href={`${username}/lesson-notes`} className='text-blue-500 w-fit hover:underline underline-offset-4'>Lesson Notes</Link>
      </div>
    </div>
  );
}
