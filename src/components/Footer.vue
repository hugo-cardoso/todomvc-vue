<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useTodosStore } from "../stores/todosStore";
import type { TodoFilter } from "../types";

const todosStore = useTodosStore();

const filterOptions: {
  label: string;
  type: TodoFilter;
}[] = [
  {
    label: "All",
    type: "all",
  },
  {
    label: "Active",
    type: "active",
  },
  {
    label: "Completed",
    type: "completed",
  },
];

const itemsLeftLabel = computed(() =>
  todosStore.activeTodos.length > 1 ? "items left" : "item left"
);
</script>

<template>
  <footer class="footer" v-if="todosStore.todos.length">
    <span class="todo-count">
      <strong>{{ todosStore.activeTodos.length }}</strong>
      {{ itemsLeftLabel }}
    </span>
    <ul class="filters">
      <li v-for="filter in filterOptions">
        <a
          href="#"
          :class="{ selected: todosStore.activeFilter === filter.type }"
          @click.prevent="() => todosStore.changeFilter(filter.type)"
        >
          {{ filter.label }}
        </a>
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="todosStore.clearCompletedTodos()"
      v-if="todosStore.completedTodos.length"
    >
      Clear completed
    </button>
  </footer>
</template>
