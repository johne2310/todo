import { LocalStorage } from 'quasar';

export default {
  namespaced: true,
  state: {
    settings: {
      show12HourFormat: false,
      showOneList: false,
    },
    test: 'test123',
  },
  mutations: {
    setTimeFormat(state, value) {
      state.settings.show12HourFormat = value;
    },
    setListFormat(state, value) {
      state.settings.showOneList = value;
    },
    saveSettings(state, settings) {
      Object.assign(state.settings, settings);
    },
  },
  actions: {
    setTimeFormat({ commit, dispatch }, value) {
      commit('setTimeFormat', value);
      dispatch('saveSettings');
    },
    setListFormat({ commit, dispatch }, value) {
      commit('setListFormat', value);
      dispatch('saveSettings');
    },
    saveSettings({ state }) {
      LocalStorage.set('todoSettings', state.settings);
    },
    loadSettings({ commit }) {
      const settings = LocalStorage.getItem('todoSettings');
      if ( settings ) {
        commit('saveSettings', settings);
      }
    },
  },
  getters: {
    settings: state => {
      return state.settings;
    },
  },
};
