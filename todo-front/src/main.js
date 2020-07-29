import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.use(vueCookies);

Vue.$cookies.config('7d');

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
