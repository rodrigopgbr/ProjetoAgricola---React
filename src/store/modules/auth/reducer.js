/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  userLogged: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/LOGIN_SUCCESS': {
        draft.token = action.payload.token;
        draft.userLogged = true;
        draft.loading = false;
        break;
      }
      case '@auth/LOGIN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/LOGOUT_SUCCESS': {
        draft.token = null;
        draft.userLogged = false;
        break;
      }

      case '@auth/LOGOUT_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
