<template>
  <a class="link-back" @click="$router.push('/')">
    <img src="../icons/arrow_back.svg" alt />
  </a>
</template>

<style scoped>
.link-back {
  cursor: pointer;
  position: absolute;
  left: 0;
}
</style>
