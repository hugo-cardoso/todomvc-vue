<script setup lang="ts">
import Header from "./components/Header.vue";
import TodoList from "./components/TodoList.vue";
import Footer from "./components/Footer.vue";

import { useTodosPersistence } from "./composables/useTodosPersistence";

useTodosPersistence();
</script>

<template>
  <Header />
  <TodoList />
  <Footer />
</template>
