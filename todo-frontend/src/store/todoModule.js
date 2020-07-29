import Vue from 'vue';

import TodoAPI from '@/api/todo-api.js';
import * as TYPES from '@/store/mutation-types.js';

const getToken = () => Vue.$cookies.get('token');
const todos = new TodoAPI();

export const todoModule = {
  state: {
    todos: [],
    isLoading: true,
  },
  mutations: {
    [TYPES.START_LOADING](state) {
      state.isLoading = true;
    },
    [TYPES.FINISH_LOADING](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [TYPES.REMOVE_TODO]: async ({ state }, payload) => {
      await todos.removeTodo(payload.id);

      state.todos = await todos.getTodos(getToken());
    },
    [TYPES.ADD_TODO]: async ({ state }, payload) => {
      await todos.addTodo(payload.title);

      state.todos = await todos.getTodos(getToken());
    },
    [TYPES.SAVE_TODO]: async ({ state }, payload) => {
      await todos.editTodo(payload.todoOptions);

      state.todos = await todos.getTodos(getToken());
    },
    [TYPES.FETCH_TODOS]: async ({ commit, state }) => {
      commit(TYPES.START_LOADING);
      setTimeout(async () => {
        state.todos = await todos.getTodos(getToken());
        commit(TYPES.FINISH_LOADING);
      }, 1000);
    },
  },
};
