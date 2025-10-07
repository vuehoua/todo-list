import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect, useCallback, useReducer } from "react";
import todosReducer, {
  initialState as initialTodosState,
} from "./reducers/todos.reducer";
import TodosPage from "./pages/TodosPage.jsx";
import Header from "./shared/Header.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const location = useLocation();
  const [title, setTitle] = useState("Todo List");

  useEffect(() => {
    if (location.pathname === "/") setTitle("Todo List");
    else if (location.pathname === "/about") setTitle("About");
    else setTitle("Not Found");
  }, [location]);

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // Load todos from Airtable

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
    <>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoState={todoState}
              handleAddTodo={handleAddTodo}
              handleCompleteTodo={handleCompleteTodo}
              updateTodo={updateTodo}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              dispatch={dispatch}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
