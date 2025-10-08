"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function QuestionPage({ params }: { params: { id: string } }) {
  const [answers, setAnswers] = useState([
    { id: "a1", text: "Use flexbox with justify-center.", accepted: false },
    { id: "a2", text: "Add margin: auto.", accepted: true },
  ]);
  const [newAnswer, setNewAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    setAnswers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: newAnswer, accepted: false },
    ]);
    setNewAnswer("");
  };

  const handleAccept = (id: string) => {
    setAnswers((prev) =>
      prev.map((ans) =>
        ans.id === id
          ? { ...ans, accepted: true }
          : { ...ans, accepted: false }
      )
    );
  };

  // Mock question text for now
  const questionText = "How do I center a div?";

  // Sort answers so accepted one is on top
  const sortedAnswers = [
    ...answers.filter((a) => a.accepted),
    ...answers.filter((a) => !a.accepted),
  ];

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">{questionText}</h1>

      {/* Answer form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="w-full border border-gray-300 rounded-md p-3 text-gray-900 mb-3"
          rows={3}
        />
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded-md"
        >
          Submit Answer
        </button>
      </form>

      {/* Answers list */}
      <ul className="space-y-3">
        {sortedAnswers.map((answer) => (
          <li
            key={answer.id}
            className={`flex items-start justify-between rounded-md border p-3 ${
              answer.accepted ? "bg-green-50 border-green-400" : ""
            }`}
          >
            <span className="text-gray-800">{answer.text}</span>
            <button
              onClick={() => handleAccept(answer.id)}
              title="Mark as accepted"
              className={`p-1 rounded ${
                answer.accepted
                  ? "text-green-600"
                  : "text-gray-400 hover:text-green-500"
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
