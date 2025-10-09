// app/api/questions/[id]/answers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ await params before destructuring
    const answers = await fetchAnswers(id);
    return NextResponse.json(answers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}
