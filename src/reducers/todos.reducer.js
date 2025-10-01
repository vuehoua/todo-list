const actions = {
  fetchTodos: "fetchTodos",
  loadTodos: "loadTodos",
  setLoadError: "setLoadError",
  startRequest: "startRequest",
  addTodo: "addTodo",
  endRequest: "endRequest",
  updateTodo: "updateTodo",
  completeTodo: "completeTodo",
  revertTodo: "revertTodo",
  clearError: "clearError",
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return { ...state, isLoading: true, errorMessage: "" };

    case actions.loadTodos: {
      const mappedTodos = action.records.map((record) => ({
        id: record.id,
        fields: {
          title: record.fields?.title || "Untitled",
          isCompleted: record.fields?.isCompleted || false,
        },
      }));
      return { ...state, todoList: mappedTodos, isLoading: false };
    }

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error?.message || "Error loading data",
        isLoading: false,
        isSaving: false,
      };

    case actions.startRequest:
      return { ...state, isSaving: true };

    case actions.addTodo: {
      const savedTodo = {
        ...action.savedTodo,
        fields: {
          ...action.savedTodo.fields,
          isCompleted: action.savedTodo.fields.isCompleted || false,
        },
      };
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return { ...state, isSaving: false, isLoading: false };

    case actions.revertTodo: {
      const originalTodo = action.originalTodo;
      const revertedTodos = state.todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      return { ...state, todoList: revertedTodos };
    }

    case actions.updateTodo: {
      const editedTodo = action.editedTodo;
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === editedTodo.id
          ? { ...todo, fields: { ...todo.fields, ...editedTodo.fields } }
          : todo
      );
      return { ...state, todoList: updatedTodos };
    }

    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              fields: { ...todo.fields, isCompleted: !todo.fields.isCompleted },
            }
          : todo
      );
      return { ...state, todoList: updatedTodos };
    }

    case actions.clearError:
      return { ...state, errorMessage: "" };

    default:
      return state;
  }
}

export default todosReducer;
