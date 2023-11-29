import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { loginSucess, loginFailure, logoutSuccess } from './actions';
import api from '../../../config/api';
import History from '../../../config/history';

export function* login({ payload }) {
  try {
    const { email, password } = payload;
    /*
    const { data } = yield call(api.post, 'sessao/login', {
      email,
      senha: password,
    });

    if (!data.status) {
      toast.error(data.data.motivo);
      yield put(loginFailure());
      return;
    }

    const { token, usuario } = data.data;
    // seta o token para ser enviado a todas requisições
    api.defaults.headers.Authorization = token;
*/
    const usuario = {
      nome: 'rodrigo',
      email: 'teste@teste.com',
    };
    yield put(loginSucess('token', usuario));
    History.push('/dashboard');
  } catch (e) {
    toast.error('Falha na autenticação, verifique seus dados. 😐');
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  // caso o usuário não tenha nada salvo
  if (!payload) return;

  const { auth } = payload;

  if (auth && auth.token) {
    api.defaults.headers.Authorization = auth.token;
  }
}

export function* logout() {
  try {
    // yield call(api.get, 'sessao/logout');
    yield put(logoutSuccess());
    History.push('/');
  } catch (e) {
    yield put(logoutSuccess());
    History.push('/');
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/LOGOUT', logout),
]);
