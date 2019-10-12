import produce from 'immer';

/** Global state */
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    const newState = draft;

    switch (action.type) {
      /** Change loading states on request action */
      case '@auth/SIGN_IN_REQUEST': {
        newState.loading = true;

        break;
      }

      /** Start user section with a token */
      case '@auth/SIGN_IN_SUCCESS': {
        newState.token = action.payload.token;
        newState.signed = true;
        newState.loading = false;

        break;
      }

      /** Change loading states on sign failure action */
      case '@auth/SIGN_FAILURE': {
        newState.loading = false;

        break;
      }

      /** Change loading states on sign up request action */
      case '@auth/SIGN_UP_REQUEST': {
        newState.loading = true;

        break;
      }

      /** Change loading states if sign is success */
      case '@auth/SIGN_UP_SUCCESS': {
        newState.loading = false;

        break;
      }

      /** To sign out, the token and signed state must be nullified */
      case '@auth/SIGN_OUT': {
        newState.token = null;
        newState.signed = false;

        break;
      }

      /** Return global state if any other action to auth are requested */
      default:
    }
  });
}
