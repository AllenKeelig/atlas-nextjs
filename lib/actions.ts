// Define your server actions here
"use server";

import { revalidatePath } from "next/cache";
import { insertTopic, insertAnswer, markAnswerAsAccepted, incrementVotes, insertQuestion } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}
export async function addQuestion(question: FormData) {
  try {
    await insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addAnswer(data: FormData) {
  const answer = data.get("answer") as string;
  const question_id = data.get("question_id") as string;

  if (!answer || !question_id) throw new Error("Missing answer or question ID");

  await insertAnswer({ answer, question_id });

  revalidatePath(`/ui/questions/${question_id}`);
}

export async function acceptAnswer(data: FormData) {
  const question_id = data.get("question_id") as string;
  const answer_id = data.get("answer_id") as string;

  if (!question_id || !answer_id) throw new Error("Missing question ID or answer ID");

  await markAnswerAsAccepted(question_id, answer_id);

  revalidatePath(`/ui/questions/${question_id}`);
}