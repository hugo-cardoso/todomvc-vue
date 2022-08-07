<script lang="ts" setup>
import TodoItem from "./TodoItem.vue";
import { useTodosStore } from "../stores/todosStore";
import type { Todo } from "../types";

const todosStore = useTodosStore();

function handleChangeTodo(todo: Todo) {
  todosStore.editTodo(todo);
}

function handleDeleteTodo(todo: Todo) {
  todosStore.deleteTodo(todo);
}

function handleToggleAllTodos(event: Event) {
  const target = event.target as HTMLInputElement;
  todosStore.editAllTodosStatus(target.checked);
}
</script>

<template>
  <section class="main" v-if="todosStore.filteredTodos.length">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @change="handleToggleAllTodos"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <TodoItem
        v-for="todo in todosStore.filteredTodos"
        :todo="todo"
        :key="todo.id"
        @change="handleChangeTodo"
        @delete="handleDeleteTodo"
      />
    </ul>
  </section>
</template>
