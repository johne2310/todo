import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import tasks from './tasks';
import settings from './settings';
import users from './users';

import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    settings,
    users,
  },

  plugins: [
    createPersistedState({
      paths: ['users.user'],
    }),
  ],
  mutations: {
    ...vuexfireMutations,
  },
  strict: process.env.NODE_ENV !== 'production',
});
