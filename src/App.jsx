import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./ToDoList";
import { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("Example Text");

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
