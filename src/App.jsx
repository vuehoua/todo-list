import "./App.css";
import TodoForm from "./features/TodoForm.jsx";
import TodoList from "./features/ToDoList/TodoList.jsx";
import { useState } from "react";

function App() {
  // const [newTodo, setNewTodo] = useState("Example Text");
  // const [todoList, setTodoList] = useState([]);
  const [todos, setTodos] = useState([]);

  // const addTodo = (title) => {
  //   const newTodo = {
  //     title: title,
  //     id: Date.now(),
  //     isCompleted: false,
  //   };
  //   setTodoList([...todoList, newTodo]);
  // };

  // const completeTodo = (id) => {
  //   const updatedTodos = todoList.map((todo) =>
  //     todo.id === id ? { ...todo, isCompleted: true } : todo
  //   );
  //   setTodoList(updatedTodos);
  // };

  function handleAddTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  }

  function handleCompleteTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onCompleteTodo={handleCompleteTodo}
        onUpdateTodo={updateTodo}
      />
    </>
  );
}

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <TodoForm onAddTodo={addTodo} />

//       {/* passing the todoList state as a prop to TodoList */}
//       <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
//     </div>
//   );
// }

export default App;
