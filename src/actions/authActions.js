import jwtDecode from "jwt-decode";
import axios from "axios";

import { SubmissionError } from "redux-form";

import { saveAuthToken, clearAuthToken } from "../localStorage";
import { post, postProtected } from "./serverAPI";

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  postProtected({ path: "/auth/refresh", getState })
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      console.log("refresh auth error", err);
      // dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken();
    });
};

export const registerUserTHUNK = user => dispatch => {
  return post({ sendObj: user, path: "/auth/signup" })
    .then(_user => {
      dispatch(loginTHUNK({ email: user.email, password: user.password }));
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
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
  return post({ path: "/auth/signin", sendObj: { email, password } })
    .then(({ authToken }) => {
      storeAuthInfo(authToken, dispatch);
    })
    .catch(err => {
      console.error("signin error", err);
      const code = err.response.status;
      const message =
        code === 401
          ? "Incorrect username or password"
          : "Unable to Login, please try again";
      dispatch(authError(message));
      // return Promise.reject(new SubmissionError({ _error: message }));
    });
};

export const LOGIN_USER = "LOGIN_USER";
export const login = user => ({
  type: LOGIN_USER,
  user
});

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const logOut = () => dispatch => {
  clearAuthToken(); // remove from local Storage
  dispatch(clearAuth()); // remove from store
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
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.sub));
  saveAuthToken(authToken);
};
