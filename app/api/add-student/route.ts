import { NextResponse } from "next/server";
import { addStudentWithSpecificId } from "@/utils/functions";

export async function POST(req: Request) {
  try {
    const { studentId, email, phone } = await req.json();

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

    await addStudentWithSpecificId(studentId, email, phone);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
