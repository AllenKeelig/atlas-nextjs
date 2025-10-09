import { NextRequest, NextResponse } from "next/server";
import { fetchTopics } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const topics = await fetchTopics();
    return NextResponse.json(topics);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}
