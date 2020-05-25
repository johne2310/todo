import { firestoreAction } from 'vuexfire';
import { todosCollection } from 'boot/firebase';
import firebase from 'firebase/app';
import { Notify } from 'quasar';

export default {
  namespaced: true,
  state: {
    todos: [],
    search: '',
    sort: 'dueDate',
    success: false,
    error: null,
    deleted: false,
    dataLoaded: false,
  },
  mutations: {
    setSearchValue(state, payload) {
      state.search = payload;
    },
    setSortBy(state, value) {
      state.sort = value;
    },
    setError(state, value) {
      state.error = value;
    },
    clearError(state) {
      state.error = null;
    },
    // setSuccess(state, value) {
    //   state.success = value;
    // },
    // setDeleted(state, value) {
    //   state.deleted = value;
    // },
    setDataLoaded(state, value) {
      state.dataLoaded = value;
    },
    clearTodos(state) {
      state.todos = [];
    },
  },
  actions: {
    bindTodos: firestoreAction(({ bindFirestoreRef, commit, rootState }) => {
      const user = rootState['users'].user.userId;
      //check if user exists (for new registrations)
      if ( user ) {
        bindFirestoreRef('todos', todosCollection.doc(user).collection(user), {
          maxRefDepth: 4,
          wait: true,
        })
          .then(() => {
            commit('setDataLoaded', true);
          })
          .catch(error => {
          });
      }
    }),
    createTask({ commit, state, rootState }, payload) {
      const user = rootState['users'].user.userId;
      const newTodo = todosCollection
        .doc(user)
        .collection(user)
        .doc();
      const id = newTodo.id;
      newTodo
        .set({
          id: id,
          name: payload.name,
          dueDate: payload.dueDate,
          dueTime: payload.dueTime,
          sortDate: payload.sortDate,
          completed: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Notify.create({
            message: 'Todo added',
            timeout: 500,
            color: 'dark',
            position: 'bottom',
          });
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },

    updateTask(context, payload) {
      context.commit('clearError');
      // get user id from user store
      const user = context.rootState['users'].user.userId;
      const queryRef = todosCollection
        .doc(user)
        .collection(user)
        .doc(payload.id);
      queryRef
        .update({
          name: payload.name,
          dueDate: payload.dueDate,
          dueTime: payload.dueTime,
          sortDate: payload.sortDate,
          completed: payload.completed,
        })
        .then(() => {
          // commit handled by VuexFire
          Notify.create({
            message: 'Todo updated',
            timeout: 500,
            color: 'dark',
            position: 'bottom',
          });
        })
        .catch(error => {
          context.commit('setError', error.message);
        });
    },
    deleteTask({ commit, rootState }, taskId) {
      const user = rootState['users'].user.userId;
      const queryRef = todosCollection
        .doc(user)
        .collection(user)
        .doc(taskId);
      queryRef
        .delete()
        .then(() => {
          Notify.create({
            message: 'Todo deleted',
            timeout: 500,
            color: 'negative',
            position: 'bottom',
          });
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    setSearchValue({ commit }, payload) {
      commit('setSearchValue', payload);
    },
    setSortBy({ commit }, value) {
      if ( value === 'name' ) {
        commit('setSortBy', value);
      } else {
        commit('setSortBy', value);
      }
    },
  },
  getters: {
    tasksTodo: (state, getters) => {
      // check if search is active first, then filter search results
      if ( state.search ) {
        return getters.searchActiveTasks.filter(
          todo => todo.completed === false
        );
      } else {
        //return non search tasks array
        if ( state.sort === 'name' ) {
          return getters.sortTodosByName.filter(todo => !todo.completed);
        } else {
          return getters.sortTodosByDate.filter(todo => !todo.completed);
        }
      }
    },
    tasksCompleted: (state, getters) => {
      //check if search is active first, then filter search results
      if ( state.search ) {
        return getters.searchActiveTasks.filter(
          todo => todo.completed === true
        );
      } else {
        //return non search tasks array
        if ( state.sort === 'name' ) {
          return getters.sortTodosByName.filter(todo => todo.completed);
        } else {
          return getters.sortTodosByDate.filter(todo => todo.completed);
        }
      }
    },
    taskTotal: state => {
      return state.todos.filter(todo => todo.completed === false).length > 0;
    },
    searchActiveTasks: state => {
      return state.todos.filter(todo =>
        todo.name.toLowerCase().match(state.search.toLowerCase())
      );
    },
    sortTodosByName: state => {
      //return non search tasks array
      return [...state.todos].sort((a, b) => {
        const nameA = a.name.toUpperCase(); //ignore case
        const nameB = b.name.toUpperCase();
        let comparison = 0;
        if ( nameA > nameB ) {
          comparison = 1;
        }
        if ( nameA < nameB ) {
          comparison = -1;
        }
        return comparison;
      });
    },
    sortTodosByDate: state => {
      return [...state.todos].sort((a, b) => {
        const dateA = a.sortDate.toString(); //without toString() the sort creates a
        // duplicate key in the array
        const dateB = b.sortDate.toString();
        let comparison = 0;
        if ( dateA > dateB ) {
          comparison = 1;
        }
        if ( dateA < dateB ) {
          comparison = -1;
        }
        return comparison;
      });
    },
    getSortBy: state => {
      return state.sort;
    },
    getSearch: state => {
      return state.search;
    },
    // getSuccess: state => {
    //   return state.success;
    // },
    getDeleted: state => {
      return state.deleted;
    },
    getError(state) {
      return state.error;
    },
  },
};
