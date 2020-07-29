<template>
  <div>
    <Back />
    <h1>Регистрация</h1>
    <div class="line" />
    <FormRegistration />
  </div>
</template>

<script>
import Back from "@/components/Back";
import FormRegistration from "@/containers/FormRegistration";

export default {
  components: {
    Back,
    FormRegistration,
  },
};
</script>
