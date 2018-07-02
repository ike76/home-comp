import axios from "axios";
import { REACT_APP_API_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const getProtected = path => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .get(`${REACT_APP_API_URL}${path}`, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data)
    .catch(err => console.log("getProtected error", err));
};

export const postProtected = (path, sendObj) => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .post(`${REACT_APP_API_URL}${path}`, sendObj, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};

export const post = (path, sendObj) => {
  console.log("post called");
  return axios
    .post(`${REACT_APP_API_URL}${path}`, sendObj)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};

export const deleteProtected = path => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .delete(`${REACT_APP_API_URL}${path}`, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};
