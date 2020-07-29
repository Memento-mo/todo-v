<template>
  <div>
    <h1>Todo application</h1>
    <div class="line" />
    <div class="text-welcome">
      <h2 class="margin">Home page</h2>
      <h3 class="margin">Welcome to your personal to-do list</h3>
    </div>
    <router-link
      v-if="!this.$cookies.get('token')"
      class="link margin"
      to="/auth/login"
      >Войти</router-link
    >
    <div v-else>
      <router-link class="margin" to="/todos">Todos</router-link>
      <button class="margin link" @click="this.logout">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as TYPES from '@/store/mutation-types.js';

export default {
  methods: {
    ...mapActions({
      logoutAction: TYPES.LOGOUT,
    }),
    logout() {
      this.logoutAction().then(() => this.$router.replace('/auth/login'));
    },
  },
};
</script>

<style scoped>
.margin {
  margin: 10px;
}

.text-welcome {
  min-height: 80px;
}
</style>
