import { useState } from "react";

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  return (
    <form onSubmit={preventRefresh}>
      <div className="todos-search">
        <label htmlFor="search-todos">Search todos: </label>
        <input
          type="text"
          id="search-todos"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setQueryString("")}>
          Clear
        </button>
      </div>

      <div className="todos-view-form">
        {/* Sort Field */}
        <label htmlFor="sort-field">Sort by: </label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        {/* Sort Direction */}
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
