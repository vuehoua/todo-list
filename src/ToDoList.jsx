import TodoListItem from "./TodoListItem";

{
  /*extract from TodoList.jsx*/
}

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  // This is checking to see if there's any todos (todoList.length === 0) 0 means it's empty
  return filteredTodoList.length === 0 ? (
    // if the list is empty it will say the message below
    <p>Add todo above to get started</p>
  ) : (
    // if the list is not empty it will show my todo list
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
