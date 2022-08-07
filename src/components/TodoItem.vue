<script lang="ts" setup>
import { nextTick, ref } from "vue";
import type { Todo } from "../types";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (event: "change", todo: Todo): void;
  (event: "delete", todo: Todo): void;
}>();

const editing = ref(false);
const editingInput = ref<HTMLInputElement>();

function handleEdit() {
  editing.value = true;
  nextTick(() => editingInput.value?.focus());
}

function handleChangeText() {
  const value = editingInput.value?.value.trim();

  if (!value) return;

  emit("change", {
    ...props.todo,
    text: value,
  });

  editing.value = false;
}

function handleChangeStatus() {
  emit("change", {
    ...props.todo,
    completed: !props.todo.completed,
  });
}

function handleDelete() {
  emit("delete", props.todo);
}
</script>

<template>
  <li
    class="todo"
    :class="{
      completed: $props.todo.completed,
      editing: editing,
    }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="$props.todo.completed"
        @change="handleChangeStatus()"
      />
      <label @dblclick="handleEdit()">{{ $props.todo.text }}</label>
      <button class="destroy" @click="handleDelete()"></button>
    </div>
    <input
      ref="editingInput"
      class="edit"
      type="text"
      :value="$props.todo.text"
      @blur="() => (editing = false)"
      @keyup.esc="() => (editing = false)"
      @keyup.enter="handleChangeText"
    />
  </li>
</template>
