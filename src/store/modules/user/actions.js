/** Action to request an update profile event. */
export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

/** Action to update profile */
export function updateProfileSuccess(data) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { data },
  };
}

/** Action if update profile failure */
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
