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

/** Failure action */
export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
