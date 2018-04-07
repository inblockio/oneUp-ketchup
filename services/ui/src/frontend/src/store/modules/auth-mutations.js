import types from './auth-types';

export default {
  // email
  [types.UPDATE_EMAIL](state, value) { state.email = value; },
  [types.CLEAR_EMAIL](state) { state.email = ''; },

  // password
  [types.UPDATE_PASSWORD](state, value) {
    state.password = value;
  },
  [types.CLEAR_PASSWORD](state) {
    state.password = '';
  },

  // password confirm
  [types.UPDATE_PASSWORDCONFIRM](state, value) {
    state.passwordConfirm = value;
  },
  [types.CLEAR_PASSWORDCONFIRM](state) {
    state.passwordConfirm = '';
  },

  // auth token
  [types.SET_AUTHENTICATED](state, value) {
    state.authenticated = value;
  },

  // auth token
  [types.SET_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
  },
  [types.CLEAR_ACCESS_TOKEN](state) {
    state.accessToken = null;
  },

  // boot
  [types.SET_BOOTED](state) {
    state.booted = true;
  },

  // error
  [types.SET_ERROR](state, error) {
    state.error = error;
  },
};
