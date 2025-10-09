// app/ui/questions/[id]/page.tsx
import { addAnswer, acceptAnswer } from "@/lib/actions";
import { fetchQuestion, fetchAnswers } from "@/lib/data";
import { CheckIcon } from "@heroicons/react/24/outline";

export default async function QuestionPage({params,}:
  {params: Promise<{ id: string }>;}) {
    const { id: questionId } = await params;
    
    // Fetch question and its answers
    const question = await fetchQuestion(questionId);
    const answers = await fetchAnswers(questionId);
    
    // Find accepted answer (if any)
    const acceptedAnswer = answers.find(a => a.id === question.answer_id);
    const otherAnswers = answers.filter(a => a.id !== question.answer_id);

    return (
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">{question?.text}</h1>
        <form action={addAnswer} className="flex flex-col gap-2">
          <input type="hidden" name="question_id" value={question.id} />
          <textarea name="answer" placeholder="Write your answer..." className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit Answer
          </button>
        </form>

        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Answers</h2>
          {acceptedAnswer && (
            <div className="border p-3 rounded bg-green-50 flex justify-between items-center">
              <p className="font-medium">{acceptedAnswer.answer}</p>
              <CheckIcon className="w-5 h-5 text-green-600" />
            </div>
          )}

          
          {otherAnswers.map((answer) => (
            <div key={answer.id} className="border p-3 rounded flex justify-between items-center">
              <p>{answer.answer}</p>
              <form action={acceptAnswer} className="inline">
                <input type="hidden" name="question_id" value={question.id} />
                <input type="hidden" name="answer_id" value={answer.id} />
                <button type="submit" className="text-gray-500 hover:text-green-600">
                  <CheckIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          ))}
        </section>
      </main>
    );
  }