import produce from 'immer';

/** Global state */
const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    /** Get user data in case of sign in success  */
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        const newState = draft;

        newState.profile = action.payload.user;
      });

    /** Return global state if any other action to user are requested */
    default:
      return state;
  }
}
