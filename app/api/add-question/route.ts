import { NextResponse } from "next/server";
import { addQuestionToSession } from "@/utils/functions";

export async function POST(req: Request) {
  try {
    const { sessionId, question, options, correctAnswer } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await addQuestionToSession(sessionId, question, options, correctAnswer);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
