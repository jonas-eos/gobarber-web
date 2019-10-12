import produce from 'immer';

/** Global state */
const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    const newState = draft;

    switch (action.type) {
      /** Get user data in case of sign in success  */
      case '@auth/SIGN_IN_SUCCESS': {
        newState.profile = action.payload.user;

        break;
      }

      /** Get user data updated and update global profile state */
      case '@user/UPDATE_PROFILE_SUCCESS': {
        newState.profile = action.payload.profile;

        break;
      }

      /** To sign out, the profile state must be nullified */
      case '@auth/SIGN_OUT': {
        newState.profile = null;

        break;
      }

      /** Return global state if any other action to user are requested */
      default:
    }
  });
}
