<script lang="ts" setup>
import { computed } from "vue";
import { useTodosStore } from "../stores/todosStore";
import TodoItem from "./TodoItem.vue";
import type { Todo } from "../types";

const todosStore = useTodosStore();

const isActiveToggleAllTodos = computed(() => !!todosStore.activeTodos.length);

function handleChangeTodo(todo: Todo) {
  todosStore.editTodo(todo);
}

function handleDeleteTodo(todo: Todo) {
  todosStore.deleteTodo(todo);
}

function handleToggleAllTodos() {
  todosStore.editAllTodosStatus(isActiveToggleAllTodos.value);
}
</script>

<template>
  <section class="main" v-if="todosStore.filteredTodos.length">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @change="handleToggleAllTodos"
      :checked="!isActiveToggleAllTodos"
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
