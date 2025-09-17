import { useState } from "react";
import Button from "../components/Button/Button.jsx";
import Input from "../components/Input/Input.jsx";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
`;

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
    <StyledForm onSubmit={preventRefresh}>
      <StyledDiv className="todos-search">
        <label htmlFor="search-todos">Search todos: </label>
        <Input
          type="text"
          id="search-todos"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setQueryString("")}>
          Clear
        </StyledButton>
      </StyledDiv>

      <StyledDiv className="todos-view-form">
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
      </StyledDiv>
    </StyledForm>
  );
}

export default TodosViewForm;
