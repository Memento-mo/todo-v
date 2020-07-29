<template>
  <div>
    <Back />
    <h1>Вход</h1>
    <div class="line" />
    <form @submit.prevent="submitLogin" class="auth-form">
      <input
        type="text"
        class="todo-input mb-2"
        v-model="username"
        placeholder="Логин..."
        :class="{ error: isError }"
      />
      <input
        type="password"
        class="todo-input mb-2"
        v-model="password"
        placeholder="Пароль..."
        :class="{ error: isError }"
      />
      <p class="error-message" v-show="isError">
        Логин и пароль не совпадают.
      </p>
      <div class="buttons">
        <router-link to="/auth/signup" type="submit" class="link create-user"
          >Создать аккаунт</router-link
        >
        <button type="submit" class="link">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import Back from '@/components/Back';
import { mapActions } from 'vuex';
import * as TYPES from '../store/mutation-types';

export default {
  data() {
    return {
      username: null,
      password: null,
      isError: false,
    };
  },
  methods: {
    ...mapActions({
      submitLoginAction: TYPES.LOGIN,
    }),

    submitLogin() {
      const infoUser = {
        username: this.username,
        password: this.password,
      };
      this.submitLoginAction(infoUser)
        .then(() => {
          this.$router.replace('/todos');
        })
        .catch(() => {
          this.username = '';
          this.password = '';
          this.isError = true;
        });
    },
  },
  components: {
    Back,
  },
};
</script>

<style scoped>
.create-user {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 14px;
}
</style>
