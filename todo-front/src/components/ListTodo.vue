<template>
  <div>
    <div class="select">
      <select class="custom-select" v-model="completed">
        <option value="all">Все</option>
        <option value="completed">Выполненные</option>
        <option value="not-completed">Не выполненные</option>
      </select>
    </div>
    <transition name="fade" mode="out-in">
      <ul v-if="filteredTodos.length" key="list">
        <transition-group name="fade-list">
          <ItemTodo
            class="fade-list-item"
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @remove-todo="removeTodo"
            @save-todo="saveTodo"
            @toggle-todo="saveTodo"
          />
        </transition-group>
      </ul>

      <p v-else key="not-list">Задачи не найдены...</p>
    </transition>
  </div>
</template>

<script>
import ItemTodo from "@/components/ItemTodo.vue";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
    "remove-todo": {
      type: Function,
      required: true,
    },
    "save-todo": {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      completed: "all",
    };
  },
  computed: {
    filteredTodos() {
      if (!Array.isArray(this.todos)) {
        return [];
      }

      switch (this.completed) {
        case "all":
          return this.todos;
        case "completed":
          return this.todos.filter((todo) => todo.completed);
        case "not-completed":
          return this.todos.filter((todo) => !todo.completed);
        default:
          return this.todos;
      }
    },
  },
  components: {
    ItemTodo,
  },
};
</script>

<style scoped>
.select {
  position: relative;
  width: 20%;
  margin: 0 auto;
}

.select:after {
  content: "";
  height: 10px;
  width: 10px;
  position: absolute;
  background: url("../icons/arrow-down.svg") no-repeat center;
  left: 86%;
  top: 20%;
}

.custom-select {
  margin-bottom: 20px;
  display: inline-block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.custom-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

option {
  font-size: 14px;
}

.fade-list-item {
  transition: all 0.5s;
}
.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
}
.fade-list-leave-active {
  position: absolute;
}
</style>