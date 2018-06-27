import axios from "axios";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const getProtected = path => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .get(`${API_BASE_URL}${path}`, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data)
    .catch(err => console.log("getProtected error", err));
};

export const postProtected = (path, sendObj) => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .post(`${API_BASE_URL}${path}`, sendObj, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};

export const post = (path, sendObj) => {
  return axios
    .post(`${API_BASE_URL}${path}`, sendObj)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};

export const deleteProtected = path => {
  const jwtAuth = localStorage.getItem("authToken");
  return axios
    .delete(`${API_BASE_URL}${path}`, { headers: { jwtAuth } })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.data);
};
