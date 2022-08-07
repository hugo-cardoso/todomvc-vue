import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { Todo, TodoFilter } from "../types";

type State = {
  todos: Todo[];
  activeFilter: TodoFilter;
};

export const useTodosStore = defineStore("todos", {
  state: (): State => ({
    todos: [],
    activeFilter: "all",
  }),
  actions: {
    addTodo(todo: Todo) {
      this.todos.push({
        ...todo,
        id: uuidv4(),
      });
    },
    deleteTodo(todo: Todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    editTodo(todo: Todo) {
      const storeTodo = this.todos.find((t) => t.id === todo.id);
      if (storeTodo) {
        storeTodo.text = todo.text;
        storeTodo.completed = todo.completed;
      }
    },
    editAllTodosStatus(completed: boolean) {
      this.todos.forEach((t) => {
        t.completed = completed;
      });
    },
    clearCompletedTodos() {
      this.todos = this.todos.filter((t) => !t.completed);
    },
    changeFilter(filter: TodoFilter) {
      this.activeFilter = filter;
    },
  },
  getters: {
    filteredTodos(): Todo[] {
      switch (this.activeFilter) {
        case "all":
          return this.todos;
        case "active":
          return this.activeTodos;
        case "completed":
          return this.completedTodos;
      }
    },

    activeTodos: (state: State) => state.todos.filter((t) => !t.completed),
    completedTodos: (state: State) => state.todos.filter((t) => t.completed),
  },
});
