import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

type TInitialState = {
  todos: TTodo[];
  filteredTodos?: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item.id === action.payload);
      task!.isCompleted = !task?.isCompleted;
      state.todos = state.todos.filter((item) => item.id !== task?.id);
      state.todos.push(task as TTodo);
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
      state.todos.push(action.payload);
    },
    filterTodo: (state, action: PayloadAction<string>) => {
      state.filteredTodos = state.todos.filter(
        (item) => item.priority === action.payload
      );
      action.payload === "none" && delete state.filteredTodos;
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, updateTodo, filterTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
