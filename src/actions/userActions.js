import { SubmissionError } from "redux-form";
import axios from "axios";

import { API_BASE_URL } from "../config";
import { addHome, updateAllHomes } from "./houseActions";

export const registerUserTHUNK = user => dispatch => {
  return axios
    .post(`${API_BASE_URL}/auth/signup`, user)
    .then(res => res.data)
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
  return axios
    .post(`${API_BASE_URL}/auth/signin`, { email, password })
    .then(res => res.data)
    .then(user => dispatch(login(user)))
    .catch(err => {
      console.log("signin error", err);
    });
};

export const LOGIN_USER = "LOGIN_USER";
export const login = user => ({
  type: LOGIN_USER,
  user
});

export const getMyHomesTHUNK = userID => dispatch => {
  axios
    .get(`${API_BASE_URL}/house/admin/${userID}`)
    .then(res => res.data)
    .then(newHomes => {
      console.log("houses from axios", newHomes);
      dispatch(updateAllHomes(newHomes));
    });
};

export const GET_MY_HOMES = "GET_MY_HOMES";
export const getMyHomes = userID => ({
  type: GET_MY_HOMES,
  userID
});
