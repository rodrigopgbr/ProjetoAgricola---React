import { takeLatest, all, put, call } from 'redux-saga/effects';
import {
  stateDrawer,
  enableLoaderDrawer,
  disableLoaderDrawer,
  errorLoaderDrawer,
  updateDrawerItens,
} from './actions';
import api from '../../../config/api';
import drawerMenuRoutes from '../../../config/drawerMenuRoutes';

export function* resetDrawer() {
  yield put(stateDrawer(true));
}

export function* loadDrawerItens({ payload }) {
  try {
    console.log('carregando drawer');
    yield put(enableLoaderDrawer());
    const { idUsuario } = payload;

    /* const { data } = yield call(api.post, 'url para pegar os itens', {
      idUsuario,
    }); */
    yield put(updateDrawerItens(drawerMenuRoutes));

    console.log('drawer carregado');
    yield put(disableLoaderDrawer());
  } catch (e) {
    yield put(errorLoaderDrawer());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', resetDrawer),
  takeLatest('persist/REHYDRATE', loadDrawerItens),
]);
