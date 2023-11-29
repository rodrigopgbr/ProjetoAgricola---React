/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  drawer: {
    drawerOpenned: true,
    drawerLoader: true,
    drawerError: false,
    drawerItens: [],
  },
};

export default function system(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@system/STATE_DRAWER': {
        draft.drawer.drawerOpenned = action.payload.state;
        break;
      }
      case '@system/UPDATE_DRAWER_ITENS': {
        draft.drawer.drawerItens = action.payload.itens;
        break;
      }
      case '@system/ENABLE_LOADER_DRAWER': {
        draft.drawer.drawerLoader = true;
        draft.drawer.drawerError = false;
        break;
      }
      case '@system/DISABLE_LOADER_DRAWER': {
        draft.drawer.drawerLoader = false;
        draft.drawer.drawerError = false;
        break;
      }
      case '@system/ERROR_LOADER_DRAWER': {
        draft.drawer.drawerLoader = false;
        draft.drawer.drawerError = true;
        break;
      }
      default:
    }
  });
}
