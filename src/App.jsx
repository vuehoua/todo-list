import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./ToDoList";
import { useState } from "react";

function App() {
  // const [newTodo, setNewTodo] = useState("Example Text");
  const [todoList, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),
    };
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />

      {/* passing the todoList state as a prop to TodoList */}
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
