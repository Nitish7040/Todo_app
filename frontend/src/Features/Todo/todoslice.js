import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [], // Initialize as an empty array
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { title, description, deadline } = action.payload;
            const todo = {
                id: nanoid(),
                title,
                description,
                deadline,
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
    }
});

export const { addTodo, removeTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
