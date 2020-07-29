import Vue from 'vue';
import Vuex from 'vuex';

import { todoModule } from '@/store/todoModule.js';
import { authModule } from '@/store/authModule.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    todoModule,
    authModule,
  },
});
