<template>
  <form @submit.prevent="() => {
    submitTodo(title)
    title = ''
    }" class="add-todo">
    <input type="text" class="todo-input" v-model="title" placeholder="Введите задачу..." />
    <button type="submit">+</button>
  </form>
</template>

<script>
export default {
  props: ["submitTodo"],
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style scoped>
input,
input:focus,
button,
button:focus {
  outline: none;
}

.add-todo {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 10px auto;
}

.todo-input {
  padding: 10px 20px;
  width: 70%;
  border: 1px solid #ced4da;
}

button {
  cursor: pointer;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  font-weight: 300;
  font-size: 35px;
}
</style>