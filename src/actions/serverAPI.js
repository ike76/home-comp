import axios from "axios";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const postProtected = ({ path, getState, sendObj }) => {
  const jwtAuth = getState().auth.authToken;
  return axios
    .post(`${API_BASE_URL}${path}`, sendObj, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};

export const post = ({ path, getState, sendObj }) => {
  return axios
    .post(`${API_BASE_URL}${path}`, sendObj)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};
