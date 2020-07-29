<template>
  <div class="todo-list">
    <form v-if="isShow" class="todo-list-edit">
      <input class="todo-input" type="text" v-model="title" />
      <button class="button" @click="saveTodo">✓</button>
    </form>
    <div class="todo-list-main" v-else-if="!isShow">
      <div class="todo-list-title">
        <input type="checkbox" :checked="todo.completed ? 'checked' : ''" @change="changeCompleted" />
        <h3 :class="{ done: todo.completed }">{{ todo.title }}</h3>
      </div>
      <div class="buttons">
        <button class="button">
          <img src="@/icons/edit.png" @click="editTodo" alt />
        </button>

        <button class="button" @click="removeTodo">
          <img src="@/icons/delete.png" alt />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
      title: this.todo.title,
    };
  },
  methods: {
    removeTodo() {
      this.$emit("remove-todo", this.todo.id);
    },
    changeCompleted() {
      this.$emit("toggle-todo", {
        id: this.todo.id,
        completed: !this.todo.completed,
      });
    },
    editTodo() {
      this.isShow = true;
    },
    saveTodo() {
      this.$emit("save-todo", { id: this.todo.id, title: this.title });
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
button:active,
button:focus {
  outline: none;
}

.todo-list {
  display: flex;
  align-items: center;
  border: 1px solid #cccc;
  margin: 30px 0;
  padding: 10px 0;
  border-radius: 10px;
  height: 3rem;
  width: 100%;
}

.todo-list-edit {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
}

.todo-input {
  width: 30%;
}

.todo-list-edit button {
  color: green;
  font-size: 30px;
  font-weight: 600;
  margin-left: 1em;
  margin-right: 25px;
}

.todo-list-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  margin: 0 20px;
}

.todo-list-title {
  display: flex;
  align-items: center;
}

.todo-list-title h3 {
  margin-left: 10px;
}

.buttons {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.button {
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  margin-right: 10px;
  cursor: pointer;
}

.button img {
  height: 1.5rem;
  width: auto;
}

.done {
  color: rgba(207, 205, 205, 0.705);
}
</style>
