import { watch } from "vue";
import { useTodosStore } from "../stores/todosStore";
import type { Todo } from "../types";

export const useTodosPersistence = () => {
  const persistenceKey = "todos";
  const todosStore = useTodosStore();

  function getLocalStorageTodos(): Todo[] {
    const todos = JSON.parse(localStorage.getItem(persistenceKey) || "[]");
    return todos;
  }

  function setLocalStorageTodos(todos: Todo[]) {
    localStorage.setItem(persistenceKey, JSON.stringify(todos));
  }

  getLocalStorageTodos().forEach((todo) => {
    todosStore.addTodo(todo);
  });

  watch(() => todosStore.todos, setLocalStorageTodos, { deep: true });
};
