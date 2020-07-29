<template>
  <main>
    <Loader v-if="isLoading" />
    <ListTodo
      v-else
      :todos="todos"
      :remove-todo="removeTodo"
      :save-todo="saveTodo"
    />
  </main>
</template>

<script>
import ListTodo from '@/components/ListTodo.vue';
import Loader from '@/components/Loader.vue';

import { mapState, mapActions } from 'vuex';
import * as TYPES from '@/store/mutation-types.js';

export default {
  computed: mapState({
    todos: (state) => state.todos,
    isLoading: (state) => state.isLoading,
  }),
  methods: {
    ...mapActions({
      removeTodoAction: TYPES.REMOVE_TODO,
      saveTodoAction: TYPES.SAVE_TODO,
      fetchTodoAction: TYPES.FETCH_TODOS,
    }),
    removeTodo(id) {
      this.removeTodoAction({ id });
    },
    saveTodo(todoOptions) {
      this.saveTodoAction({ todoOptions });
    },
  },
  mounted() {
    this.fetchTodoAction();
  },
  components: {
    ListTodo,
    Loader,
  },
};
</script>
