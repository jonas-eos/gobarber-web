/** Action to request system access token. */
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

/** Login success action, with token and user information */
export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

/** SingUp request action, with name, email and password information */
export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

/** Failure action */
export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
