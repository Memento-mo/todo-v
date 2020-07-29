<template>
  <div>
    <Back />
    <h1>Вход</h1>
    <div class="line" />
    <FormLogin />
  </div>
</template>

<script>
import Back from "@/components/Back";
import FormLogin from "@/containers/FormLogin";

export default {
  components: {
    Back,
    FormLogin,
  },
};
</script>
