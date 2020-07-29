<template>
  <FormAddTodo :submitTodo="submitTodo" />
</template>

<script>
import { mapActions } from "vuex";
import * as TYPES from "@/store/mutation-types.js";
import FormAddTodo from "@/components/FormAddTodo.vue";

export default {
  methods: {
    ...mapActions({
      submitTodoAction: TYPES.ADD_TODO,
    }),
    submitTodo(title) {
      if (title === "") {
        return;
      }

      this.submitTodoAction({ title });
    },
  },
  components: {
    FormAddTodo,
  },
};
</script>