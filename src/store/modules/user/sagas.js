import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

/**
 * Receives the request to update the profile.
 * The password is updated only if the oldPassword field is filled, if the field
 * is blank, the user does not want to update the password.
 * @generator @function
 * @param {object} Payload
 */
export function* updateProfile({ payload }) {
  try {
    const { name, email, ...passwordData } = payload.data;
    const profile = {
      name,
      email,
      ...(passwordData.oldPassword ? passwordData : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Profile updated with success!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Error to update profile, check your informations!');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
