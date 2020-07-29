import Vue from 'vue';

import * as TYPES from '@/store/mutation-types.js';
import AuthAPI from '@/api/auth-api.js';

const auth = new AuthAPI();

export const authModule = {
  state: {},
  actions: {
    [TYPES.LOGIN]: async (ctx, infoUser) => {
      const token = await auth.login(infoUser);

      Vue.$cookies.set('token', token);
    },
    [TYPES.LOGOUT]: async () => Vue.$cookies.remove('token'),
    [TYPES.CREATE_USER]: async (ctx, infoUser) => {
      return await auth.signUp(infoUser);
    },
  },
};
