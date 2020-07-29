import Vue from 'vue';
import Vuex from 'vuex';

import * as TYPES from '@/store/mutation-types.js';
import TodoAPI from '@/api/todo-api.js';
import AuthAPI from '@/api/auth-api.js';

Vue.use(Vuex);

const todos = new TodoAPI();
const auth = new AuthAPI();
const getToken = () => Vue.$cookies.get('token');

export const store = new Vuex.Store({
  state: {
    todos: [],
    isLoading: true,
  },
  mutations: {
    [TYPES.REMOVE_TODO](state, payload) {
      state.todos = payload.todos;
    },
    [TYPES.ADD_TODO](state, payload) {
      state.todos = payload.todos;
    },
    [TYPES.SAVE_TODO](state, payload) {
      state.todos = payload.todos;
    },
    [TYPES.START_LOADING](state) {
      state.isLoading = true;
    },
    [TYPES.FINISH_LOADING](state) {
      state.isLoading = false;
    },
  },

  actions: {
    [TYPES.REMOVE_TODO]: async ({ commit }, payload) => {
      await todos.removeTodo(payload.id);

      commit(TYPES.REMOVE_TODO, { todos: await todos.getTodos(getToken()) });
    },
    [TYPES.ADD_TODO]: async ({ commit }, payload) => {
      await todos.addTodo(payload.title);

      commit(TYPES.ADD_TODO, { todos: await todos.getTodos(getToken()) });
    },
    [TYPES.SAVE_TODO]: async ({ commit }, payload) => {
      await todos.editTodo(payload.todoOptions);

      commit(TYPES.SAVE_TODO, { todos: await todos.getTodos(getToken()) });
    },
    [TYPES.FETCH_TODOS]: async ({ commit, state }) => {
      commit(TYPES.START_LOADING);
      setTimeout(async () => {
        state.todos = await todos.getTodos(getToken());
        commit(TYPES.FINISH_LOADING);
      }, 1000);
    },
    [TYPES.LOGIN]: async (ctx, infoUser) => {
      const token = await auth.login(infoUser);

      Vue.$cookies.set('token', token);
    },
    [TYPES.LOGOUT]: async () => Vue.$cookies.remove('token'),
    [TYPES.CREATE_USER]: async (ctx, infoUser) => {
      return await auth.signUp(infoUser);
    },
  },
});
