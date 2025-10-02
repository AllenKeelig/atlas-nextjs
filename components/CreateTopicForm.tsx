import { addTopic } from "@/lib/actions";

export default function CreateTopicForm() {
  return (
    <form action={addTopic}>
      <input type="string" name="title" />
    </form>
  );
}