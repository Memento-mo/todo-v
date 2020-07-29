<template>
  <div>
    <Back />

    <h1>Todos</h1>
    <HeaderTodo />
    <div class="line" />
    <MainTodo />
  </div>
</template>

<script>
import HeaderTodo from '@/containers/HeaderTodo.vue';
import MainTodo from '@/containers/MainTodo.vue';
import Back from '@/components/Back.vue';

export default {
  components: {
    HeaderTodo,
    MainTodo,
    Back,
  },
  mounted() {
    if (!this.$cookies.get('token')) {
      this.$router.push('/auth/login');
    }
  },
};
</script>
