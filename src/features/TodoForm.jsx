import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault(); //prevent the page from refreshing when a user clicks the Add Todo button

    //so there won't be any empty todos
    if (workingTodoTitle.trim() === "") return;

    // console.dir(event.target.title.value);
    // const title = event.target.title.value;
    // onAddTodo(title);

    onAddTodo(workingTodoTitle);

    // clear input
    setWorkingTodoTitle("");

    // event.target.title.value = ""; //clear the input after clicking the Add Todo button

    // todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        autoFocus
      />

      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
