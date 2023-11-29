export function loginRequest(email, password) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function loginSucess(token, user) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { token, user },
  };
}

export function loginFailure() {
  return { type: '@auth/LOGIN_FAILURE' };
}

export function logout() {
  return { type: '@auth/LOGOUT' };
}

export function logoutSuccess() {
  return { type: '@auth/LOGOUT_SUCCESS' };
}

export function logoutFailure() {
  return { type: '@auth/LOGOUT_FAILURE' };
}
