import { NextRequest, NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ Await params
    const answers = await fetchAnswers(id);
    return NextResponse.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}
