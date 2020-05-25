// import { usersCollection } from '../../boot/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
// import { todosCollection } from 'boot/firebase';

export default {
  namespaced: true,
  state: {
    user: {},
    error: null,
    loading: false,
    isLoggedIn: false,
  },
  mutations: {
    registerUser(state, payload) {
      state.user = {
        userId: payload.uid,
        email: payload.email,
      };
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    loginUser(state, payload) {
      state.user = {
        userId: payload.uid,
        email: payload.email,
      };
    },
    logoutUser(state) {
      state.user = {};
    },
  },

  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('setLoading', false);
          commit('registerUser', cred.user);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    loginUser({ state, commit, rootState }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          commit('setLoading', false);
          commit('loginUser', cred.user);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    logoutUser({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('tasks/setDataLoaded', false, { root: true });
          commit('logoutUser');
          commit('tasks/clearTodos', null, { root: true });
        });
    },
    authStateChange({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if ( user ) {
          //call the bind action from tasks module to connect to firebase
          dispatch('tasks/bindTodos', null, { root: true });
          commit('setLoggedIn', true);
          this.$router.push({ name: 'Home' }).catch(error => {
          });
        } else {
          commit('setLoggedIn', false);
          this.$router.replace({ name: 'Login' }).catch(error => {
          });
        }
      });
    },
  },

  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
  },
};

// rootState and rootGetters working examples
// console.log(
//   'List Format: ',
//   rootGetters['settings/settings'].showOneList
// );
// console.log('getTest: ', rootState['settings'].test);
