import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure, signUpSuccess } from './actions';

/**
 * Performs user authentication.
 * For the user to be successfully authenticated and redirected to the
 * dashboard, they must be a provider.
 * The user data are passed through the signInSuccess, passing the user access
 * token and its information that comes from the API.
 * Token must be assigned in Bearer property in API authorization header
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

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    toast.error('Your account or password is incorrect.');

    yield put(signFailure());
  }

  return history.push('/dashboard');
}

/**
 * Performs user registration.
 * For the registration to be successful, the user must fill the data correctly,
 * these rules are validated on the Sign up page, so in this part of the code
 * all data is already correct.
 * If the user already exists, they should display an error on the screen for
 * the user to check their registration information.
 * @generator @function
 * @param {object} payload
 * @return redirection to root page
 */
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'user/create', {
      name,
      email,
      password,
      provider: true,
    });

    yield put(signUpSuccess());

    history.push('/');
  } catch (error) {
    toast.error('Registration failed, check your informations!');

    yield put(signFailure());
  }
}

/**
 * Retrieve Active Section Token
 * The token is retrieved from the default persistent action payload.
 * The token must be retrieved and feed the API authorization header.
 * If the section does not exist, it should return nothing to the user.
 * @function
 * @param {object} payload
 */
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

/**
 * Once the states that validate that a exists a logged user was nullified,
 * you must direct the page to the main page.
 * @function
 */
export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
