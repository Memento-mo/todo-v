<template>
  <div id="app" class="container">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { store } from '@/store/store.js';

export default {
  name: 'App',
  store,
};
</script>

<style>
a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 300;
  font-size: 20px;
}
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.todo-input {
  padding: 10px 20px;
  width: 70%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.todo-input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.line {
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-item {
  transition: all 0.5s;
}

.link {
  text-decoration: none;
  margin-right: 10px;
  padding: 10px 20px;
  background: #2c3e50;
  color: #fff;
  border-radius: 5px;
  transition: 0.3s ease;
  border: 1px solid #2c3e50;
  font-size: 16px;
}

.link:hover {
  cursor: pointer;
  background: #fff;
  color: #2c3e50;
}

.mb-2 {
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
}

.error {
  border: 1px solid red;
}

.error:focus {
  box-shadow: 0 0 0 0.2rem rgba(207, 17, 17, 0.25);
}

.error-message {
  margin: 5px 0 20px 0;
  color: rgba(255, 0, 0, 0.835);
}
</style>
