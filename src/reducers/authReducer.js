import {
  AUTH_REQUEST,
  SET_AUTH_TOKEN,
  AUTH_SUCCESS,
  CLEAR_AUTH
} from "../actions/authActions";

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  user: "",
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case SET_AUTH_TOKEN:
      const { authToken } = action;
      return { ...state, authToken };
    case AUTH_SUCCESS:
      const { user } = action;
      return { ...state, loading: false, user };
    case CLEAR_AUTH:
      return { ...initialState };
    default:
      return state;
  }
};
