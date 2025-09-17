import { useState } from "react";
import Button from "../components/Button/Button.jsx";
import Input from "../components/Input/Input.jsx";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem;
  &:disabled {
    font-style: itaclic;
  }
`;

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
      <Input
        type="text"
        placeholder="Enter todo..."
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />

      <StyledButton
        type="submit"
        disabled={!workingTodoTitle.trim() || isSaving}
      >
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </form>
  );
}

export default TodoForm;
