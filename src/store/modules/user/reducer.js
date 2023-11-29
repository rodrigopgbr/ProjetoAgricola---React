/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  user: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/LOGIN_SUCCESS': {
        draft.user = action.payload.user;
        break;
      }
      case '@auth/LOGOUT_SUCCESS': {
        draft.user = null;
        break;
      }
      default:
    }
  });
}
