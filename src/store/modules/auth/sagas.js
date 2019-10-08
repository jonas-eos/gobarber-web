import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

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
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('User is not a provider!');
      return yield put(signFailure());
    }

    yield put(signInSuccess(token, user));
  } catch (error) {
    toast.error('Your account or password is incorrect.');

    yield put(signFailure());
  }

  return history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
