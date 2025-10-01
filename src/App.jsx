import "./App.css";
import TodoForm from "./features/TodoForm.jsx";
import TodoList from "./features/todolist/TodoList.jsx";
import { useState, useEffect, useCallback, useReducer } from "react";
import TodosViewForm from "./features/TodosViewForm.jsx";
import styles from "./App.module.css";
import todosReducer, {
  initialState as initialTodosState,
} from "./reducers/todos.reducer";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

//   return encodeURI(`${url}?${sortQuery}${searchQuery}`);
// };

// const encodeUrl = ({ sortField, sortDirection }) => {
//   let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
//   return encodeURI(`${url}?${sortQuery}`);
// };

function App() {
  // const [todos, setTodos] = useState([]); // List of todos
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  // const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  //   let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  //   let searchQuery = "";
  //   if (queryString) {
  //     searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  //   }

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // Load todos from Airtable
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     setIsLoading(true);
  //     setErrorMessage("");

  //     try {
  //       const resp = await fetch(encodeUrl(), {
  //         method: "GET",
  //         headers: { Authorization: token },
  //       });
  //       if (!resp.ok)
  //         throw new Error(`Failed to fetch todos: ${resp.statusText}`);

  //       const { records } = await resp.json();
  //       const mappedTodos = records.map((record) => ({
  //         id: record.id,
  //         fields: {
  //           title: record.fields?.title || "Untitled",
  //           isCompleted: record.fields?.isCompleted || false,
  //         },
  //       }));

  //       setTodos(mappedTodos);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTodos();
  // }, [encodeUrl]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "fetchTodos" });
      try {
        const resp = await fetch(encodeUrl(), {
          method: "GET",
          headers: { Authorization: token },
        });
        if (!resp.ok)
          throw new Error(`Failed to fetch todos: ${resp.statusText}`);
        const { records } = await resp.json();
        dispatch({ type: "loadTodos", records });
      } catch (error) {
        dispatch({ type: "setLoadError", error });
      }
    };
    fetchTodos();
  }, [encodeUrl]);

  // Add new todo
  // const handleAddTodo = async (title) => {
  //   if (!title.trim()) return;
  //   setIsSaving(true);

  //   const payload = {
  //     records: [
  //       {
  //         fields: { title: title.trim(), isCompleted: false },
  //       },
  //     ],
  //   };

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };

  //   try {
  //     const resp = await fetch(url, options);
  //     if (!resp.ok) throw new Error(`Failed to add todo: ${resp.statusText}`);

  //     const { records } = await resp.json();
  //     const mappedTodos = records.map((record) => ({
  //       id: record.id,
  //       fields: {
  //         title: record.fields?.title || "Untitled",
  //         isCompleted: record.fields?.isCompleted || false,
  //       },
  //     }));

  //     setTodos((prevTodos) => [...prevTodos, ...mappedTodos]);
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleAddTodo = async (title) => {
    if (!title.trim()) return;
    dispatch({ type: "startRequest" });
    const payload = {
      records: [{ fields: { title: title.trim(), isCompleted: false } }],
    };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(`Failed to add todo: ${resp.statusText}`);
      const { records } = await resp.json();
      const savedTodo = records.map((record) => ({
        id: record.id,
        fields: {
          title: record.fields?.title || "Untitled",
          isCompleted: record.fields?.isCompleted || false,
        },
      }))[0];
      dispatch({ type: "addTodo", savedTodo });
    } catch (error) {
      dispatch({ type: "setLoadError", error });
    } finally {
      dispatch({ type: "endRequest" });
    }
  };

  // // Update todo
  // const updateTodo = async (editedTodo) => {
  //   const originalTodo = todos.find((todo) => todo.id === editedTodo.id);
  //   if (!originalTodo) return;

  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === editedTodo.id
  //         ? { ...todo, fields: { ...todo.fields, ...editedTodo.fields } }
  //         : todo
  //     )
  //   );

  //   const payload = {
  //     records: [
  //       {
  //         id: editedTodo.id,
  //         fields: editedTodo.fields,
  //       },
  //     ],
  //   };

  //   const options = {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };

  //   try {
  //     const resp = await fetch(url, options);
  //     if (!resp.ok)
  //       throw new Error(`Failed to update todo: ${resp.statusText}`);
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage(`${error.message}. Reverting todo...`);
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) =>
  //         todo.id === originalTodo.id ? originalTodo : todo
  //       )
  //     );
  //   }
  // };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((t) => t.id === editedTodo.id);
    if (!originalTodo) return;
    dispatch({ type: "updateTodo", editedTodo });
    try {
      const resp = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({
          records: [{ id: editedTodo.id, fields: editedTodo.fields }],
        }),
      });
      if (!resp.ok)
        throw new Error(`Failed to update todo: ${resp.statusText}`);
    } catch (error) {
      dispatch({ type: "revertTodo", originalTodo });
    }
  };

  // const handleCompleteTodo = async (id) => {
  //   const todoToUpdate = todos.find((todo) => todo.id === id);
  //   if (!todoToUpdate) return;

  //   const originalTodo = { ...todoToUpdate };

  //   const updatedTodo = {
  //     ...todoToUpdate,
  //     fields: {
  //       ...todoToUpdate.fields,
  //       isCompleted: !todoToUpdate.fields.isCompleted,
  //     },
  //   };

  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
  //   );

  //   const payload = {
  //     records: [
  //       {
  //         id: updatedTodo.id,
  //         fields: updatedTodo.fields,
  //       },
  //     ],
  //   };

  //   const options = {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };

  //   try {
  //     const resp = await fetch(url, options);
  //     if (!resp.ok)
  //       throw new Error(`Failed to update todo: ${resp.statusText}`);
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage(`${error.message}. Reverting todo...`);
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) => (todo.id === id ? originalTodo : todo))
  //     );
  //   }
  // };

  const handleCompleteTodo = async (id) => {
    const originalTodo = todoState.todoList.find((t) => t.id === id);
    if (!originalTodo) return;
    dispatch({ type: "completeTodo", id });
    try {
      const resp = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({
          records: [
            {
              id,
              fields: { isCompleted: !originalTodo.fields.isCompleted },
            },
          ],
        }),
      });

      if (!resp.ok)
        throw new Error(`Failed to complete todo: ${resp.statusText}`);
    } catch (error) {
      dispatch({ type: "revertTodo", originalTodo });
    }
  };

  return (
    <div className={styles.appContainer}>
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />

      <TodoList
        todos={todoState.todoList.filter((todo) => !todo.fields.isCompleted)}
        onCompleteTodo={handleCompleteTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

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

export default App;
