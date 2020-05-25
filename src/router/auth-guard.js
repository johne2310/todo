import store from '../store';

export default (to, from, next) => {
  if ( store.getters['users/isLoggedIn'] ) {
    next();
  } else {
    next({ name: 'Login' });
  }
};
