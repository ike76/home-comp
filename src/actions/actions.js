import axios from "axios";

export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const sortByPrice = ascending => ({
  type: SORT_BY_PRICE,
  ascending
});
export const SORT_BY_CUSTOM = "SORT_BY_CUSTOM";
export const sortByCustom = (attr, ascending) => ({
  type: SORT_BY_CUSTOM,
  attr,
  ascending
});
export const CHANGE_HOME_VALUE = "CHANGE_HOME_VALUE";
export const changeHomeValue = (homeId, attr, newValue) => ({
  type: CHANGE_HOME_VALUE,
  homeId,
  attr,
  newValue
});
export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addNewHome = newHomeObj => ({
  type: ADD_NEW_HOME,
  newHomeObj
});

export const DISPLAY_MESSAGE = "DISPLAY_MESSAGE";
export const displayMessage = message => ({
  type: DISPLAY_MESSAGE,
  message
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
export const thunkDisplayMessage = message => dispatch => {
  dispatch(displayMessage(message));
};

export const getHouse = houseId => dispatch => {
  axios
    .get(`http://localhost:8000/house/${houseId}`)
    .then(res => res.data)
    .then(obj => dispatch(displayMessage(obj.location)));
};
