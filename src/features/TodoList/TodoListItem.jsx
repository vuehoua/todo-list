import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import Button from "../../components/Button/Button";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li className={styles.todoListItem}>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todo-edit-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleEdit}
              inputRef={null}
            />
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdate}>
              Update
            </Button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.fields.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.fields.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
