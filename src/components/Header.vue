<script lang="ts" setup>
import { ref } from "vue";
import { useTodosStore } from "../stores/todosStore";

const todosStore = useTodosStore();

const newTodoInput = ref<HTMLInputElement>();

function handleAddTodo() {
  if (!newTodoInput.value) return;

  const value = newTodoInput.value.value.trim();

  if (!value) return;

  todosStore.addTodo({
    text: value,
    completed: false,
  });

  newTodoInput.value.value = "";
}
</script>

<template>
  <header className="header">
    <h1>todos</h1>
    <input
      ref="newTodoInput"
      class="new-todo"
      placeholder="What needs to be done?"
      :autoFocus="true"
      autocomplete="none"
      @keydown.enter="handleAddTodo"
    />
  </header>
</template>
