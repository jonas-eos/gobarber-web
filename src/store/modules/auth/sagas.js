import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess } from './actions';

/**
 * Performs user authentication.
 * For the user to be successfully authenticated and redirected to the
 * dashboard, they must be a provider.
 * The user data are passed through the signInSuccess, passing the user access
 * token and its information that comes from the API.
 * @generator @function
 * @param {object} payload
 * @return redirection to dashboard
 */
export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  // TODO steps if user isn't a provider
  if (!user.provider) {
    console.tron.error('User is not a provider!'); // eslint-disable-line
    return 0;
  }

  yield put(signInSuccess(token, user));

  return history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
