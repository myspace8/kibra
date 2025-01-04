import { NextResponse } from "next/server";
import { createNewSession } from "@/utils/functions";

export async function POST(req: Request) {
  try {
    const {
      creatorId,
      sessionTitle,
      lessonNote,
      numberOfQuestions,
    } = await req.json();

    if (!creatorId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    await createNewSession(creatorId, sessionTitle,numberOfQuestions, lessonNote);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
