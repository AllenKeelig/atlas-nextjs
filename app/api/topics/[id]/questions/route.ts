// app/api/topics/[id]/questions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const questions = await fetchQuestions(id);
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
