import Link from 'next/link';

export default function LessonNotes({ params }: any) {
  const { username } = params;
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1>{username}: Your lesson notes appears here</h1>
    </div>
  );
}
