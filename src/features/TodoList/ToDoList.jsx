import TodoListItem from "./TodoListItem";

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  if (isLoading) return <p>Todo list loading...</p>;

  if (!todos || todos.length === 0) return <p>No todos found</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.fields?.isCompleted || false}
            onChange={() => onCompleteTodo(todo.id)}
          />
          <span>{todo.fields?.title || "Untitled"}</span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
