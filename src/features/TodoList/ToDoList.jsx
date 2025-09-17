import styles from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  if (isLoading) return <p>Todo list loading...</p>;

  if (!todos || todos.length === 0) return <p>No todos found</p>;

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
