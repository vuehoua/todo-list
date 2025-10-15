import TodoForm from "../features/TodoForm.jsx";
import TodoList from "../features/todolist/TodoList.jsx";
import TodosViewForm from "../features/TodosViewForm.jsx";
import styles from "../App.module.css";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function TodosPage({
  todoState,
  handleAddTodo,
  handleCompleteTodo,
  updateTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  dispatch,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const filteredTodos = todoState.todoList.filter(
    (todo) => !todo.fields.isCompleted
  );

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const currentTodos = filteredTodos.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  return (
    <div className={styles.appContainer}>
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />

      <TodoList
        todos={currentTodos}
        onCompleteTodo={handleCompleteTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      <hr />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {todoState.errorMessage && (
        <div className={styles.errorMessage}>
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: "clearError" })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default TodosPage;
