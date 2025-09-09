import { useState } from "react";

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!workingTodoTitle.trim()) return;

    onAddTodo(workingTodoTitle.trim());
    setWorkingTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo..."
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />

      <button type="submit" disabled={!workingTodoTitle.trim() || isSaving}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
