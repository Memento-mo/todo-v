<template>
  <form @submit.prevent="createUser" class="auth-form">
    <input
      type="text"
      class="todo-input mb-2"
      v-model="username"
      placeholder="Логин..."
      :class="{ error: isError }"
    />
    <input
      type="email"
      class="todo-input mb-2"
      v-model="email"
      placeholder="Email..."
      :class="{ error: isError }"
    />
    <input
      type="password"
      class="todo-input mb-2"
      v-model="password"
      placeholder="Пароль..."
      :class="{ error: isError }"
    />
    <p class="error-message" v-show="isError">Такое имя уже существует</p>
    <button type="submit" class="link">Создать</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import * as TYPES from "@/store/mutation-types";

export default {
  data() {
    return {
      username: null,
      password: null,
      email: null,
      isError: false,
    };
  },
  methods: {
    ...mapActions({
      createUserAction: TYPES.CREATE_USER,
    }),
    createUser() {
      const infoUser = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      this.createUserAction(infoUser)
        .then(() => this.$router.replace("/auth/login"))
        .catch(() => {
          this.password = "";
          this.isError = true;
        });
    },
  },
};
</script>