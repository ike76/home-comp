import axios from "axios";

import { API_BASE_URL } from "../config";

export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addHome = houseObj => dispatch => {
  axios
    .post(`${API_BASE_URL}/house`, houseObj)
    .then(response => response.data)
    .then(house => {
      console.log("axios house response", house);
      dispatch({ type: ADD_NEW_HOME, house });
    });
};

export const ADD_ATTRIBUTE = "ADD_ATTRIBUTE";
export const addAttribute = attr => ({
  type: ADD_ATTRIBUTE,
  attr
});

export const EDIT_ATTRIBUTE = "EDIT_ATTRIBUTE";
export const editAttribute = attr => ({
  type: EDIT_ATTRIBUTE,
  attr
});
export const DELETE_ATTRIBUTE = "DELETE_ATTRIBUTE";
export const deleteAttribute = attr => ({
  type: DELETE_ATTRIBUTE,
  attr
});
