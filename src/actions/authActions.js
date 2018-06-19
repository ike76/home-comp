import jwtDecode from "jwt-decode";
import axios from "axios";

import { SubmissionError } from "redux-form";

import { API_BASE_URL } from "../config";
import { saveAuthToken, clearAuthToken } from "../localStorage";
import { normalizeResponseErrors } from "./utils";
import { post, postProtected } from "./serverAPI";

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  postProtected({ path: "/auth/refresh", getState })
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken();
    });
};

export const registerUserTHUNK = user => dispatch => {
  return post({ sendObj: user, path: "/auth/signup" })
    .then(_user => {
      console.log("user from register action", _user);
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
  console.log("logging in", email, password);
  return axios
    .post(`${API_BASE_URL}/auth/signin`, { email, password })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data)
    .then(({ authToken }) => {
      storeAuthInfo(authToken, dispatch);
    })
    .catch(err => {
      console.log("signin error", err);
      const { code } = err;
      const message =
        code === 401
          ? "Incorrect username or password"
          : "Unable to Login, please try again";
      dispatch(authError(err));
      return Promise.reject(new SubmissionError({ _error: message }));
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
  console.log("decoded Token", decodedToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.sub));
  saveAuthToken(authToken);
};
