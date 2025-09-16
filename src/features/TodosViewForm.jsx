import { useState, useEffect } from "react";

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const handleClear = () => {
    setLocalQueryString("");
    setQueryString("");
  };

  return (
    <form onSubmit={preventRefresh}>
      <div className="todos-search">
        <label htmlFor="search-todos">Search todos: </label>
        <input
          type="text"
          id="search-todos"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="todos-view-form">
        <label htmlFor="sort-field">Sort by: </label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="sort-direction" style={{ marginLeft: "1rem" }}>
          Direction:{" "}
        </label>
        <select
          id="sort-direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
