import axios from "axios";
import { ADMIN_ID } from "../config";

import { API_BASE_URL } from "../config";

export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addHomeTHUNK = houseObj => dispatch => {
  axios
    .post(`${API_BASE_URL}/house`, {
      location: houseObj,
      adminId: ADMIN_ID
    })
    .then(response => response.data)
    .then(house => {
      console.log("axios house response", house);
      dispatch(addHome(house));
    });
};
export const addHome = house => ({
  type: ADD_NEW_HOME,
  house
});

export const editHomeTHUNK = ({ homeId, homeKey, updateObj }) => dispatch => {
  // dispatch start request
  axios
    .post(`${API_BASE_URL}/house/${homeId}`, { homeKey, updateObj })
    .then(res => res.data)
    .then(updatedHouse => {
      console.log("updatedHouse from axios", updatedHouse);
      dispatch(editHome(updatedHouse));
    });
};
export const EDIT_HOME = "EDIT_HOME";
export const editHome = updatedHouse => ({
  type: EDIT_HOME,
  updatedHouse
});

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
export const EDIT_HOUSE = "EDIT_HOUSE";
export const editHouse = editObj => dispatch => {
  const { key, newValue } = editObj;
};
