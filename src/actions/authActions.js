import jwtDecode from "jwt-decode";

import { SubmissionError } from "redux-form";

import { saveAuthToken, clearAuthToken } from "./localStorage";
import { post, postProtected } from "./serverAPI";
import { resetStore, updateAttributes, getMyHomes } from "./houseActions";

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  postProtected("/auth/refresh")
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      console.log("refresh auth error", err);
      dispatch(clearAuth());
      clearAuthToken();
    });
};

export const registerUser = user => dispatch => {
  return post("/auth/signup", user)
    .then(response => {
      dispatch("yo");
      dispatch(loginTHUNK({ email: user.email, password: user.password }));
      return response; // for test
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const loginTHUNK = ({ email, password }) => dispatch => {
  dispatch(authRequest());
  return post("/auth/signin", { email, password })
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      const code = err.response && err.response.status;
      const message =
        code === 401
          ? "Incorrect username or password"
          : "Unable to Login, please try again";
      dispatch(authError(message));
    });
};

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const logOut = () => dispatch => {
  clearAuthToken(); // remove from local Storage
  dispatch(clearAuth()); // remove from store
  dispatch(resetStore());
};

export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  user
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  const user = decodedToken.sub;
  dispatch(setAuthToken(authToken));
  saveAuthToken(authToken);
  dispatch(updateAttributes(user.homeAttributes));
  dispatch(authSuccess(decodedToken.sub));
  dispatch(getMyHomes());
};
