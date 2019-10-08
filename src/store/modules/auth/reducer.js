import produce from 'immer';

/** Global state */
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    /** Start user section with a token */
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        const newState = draft;

        newState.token = action.payload.token;
        newState.signed = true;
      });

    /** Return global state if any other action to auth are requested */
    default:
      return state;
  }
}
