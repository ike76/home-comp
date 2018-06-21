import axios from "axios";
import { API_BASE_URL } from "../config";

export const SORT_BY_CUSTOM = "SORT_BY_CUSTOM";
export const sortByCustom = (attr, ascending) => ({
  type: SORT_BY_CUSTOM,
  attr,
  ascending
});

export const SET_IMAGE_PUBLIC_ID = "SET_IMAGE_PUBLIC_ID";
export const setImagePublicID = ({ homeId, attr, publicId }) => ({
  type: SET_IMAGE_PUBLIC_ID,
  homeId,
  attr,
  publicId
});

export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addHome = house => ({
  type: ADD_NEW_HOME,
  house
});

export const addHomeTHUNK = houseObj => (dispatch, getState) => {
  const jwtAuth = getState().auth.authToken;
  axios
    .post(
      `${API_BASE_URL}/house`,
      {
        location: houseObj
      },
      { headers: { jwtAuth } }
    )
    .then(response => response.data)
    .then(house => {
      console.log("axios house response", house);
      dispatch(addHome(house));
    });
};

export const editHomeTHUNK = ({ homeId, homeKey, updateObj }) => (
  dispatch,
  getState
) => {
  // dispatch start request
  const jwtAuth = getState().auth.authToken;
  axios
    .post(
      `${API_BASE_URL}/house/${homeId}`,
      { homeKey, updateObj },
      { headers: { jwtAuth } }
    )
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

export const removeHomeTHUNK = homeId => (dispatch, getState) => {
  const jwtAuth = getState().auth.authToken;

  axios
    .delete(`${API_BASE_URL}/house/${homeId}`, { headers: { jwtAuth } })
    .then(res => res.data)
    .then(newHomes => {
      console.log("response from axios", newHomes);
      dispatch(updateAllHomes(newHomes));
    })
    .catch(err => console.log(err));
};
export const UPDATE_ALL_HOMES = "UPDATE_ALL_HOMES";
export const updateAllHomes = newHomes => ({
  type: UPDATE_ALL_HOMES,
  newHomes
});

export const addAttribute = attrArray => (dispatch, getState) => {
  console.log("adding attributes");
  const jwtAuth = getState().auth.authToken;
  axios
    .post(
      `${API_BASE_URL}/user/attributes`,
      { newAttributes: attrArray },
      { headers: { jwtAuth } }
    )
    .then(res => res.data)
    .then(({ homeAttributes }) => {
      console.log("new homeAttributes", homeAttributes);
      dispatch(updateAttributes(homeAttributes));
    });
};

export const UPDATE_ATTRIBUTES = "UPDATE_ATTRIBUTES";
export const updateAttributes = attrNames => ({
  type: UPDATE_ATTRIBUTES,
  attrNames
});
export const ADD_ATTRIBUTE = "ADD_ATTRIBUTE";
// export const addAttribute = attr => ({
//   type: ADD_ATTRIBUTE,
//   attr
// });

export const EDIT_ATTRIBUTE = "EDIT_ATTRIBUTE";
export const editAttribute = attr => ({
  type: EDIT_ATTRIBUTE,
  attr
});
export const deleteAttribute = attrId => (dispatch, getState) => {
  const jwtAuth = getState().auth.authToken;
  axios
    .post(
      `${API_BASE_URL}/user/deleteAttribute/${attrId}`,
      {},
      {
        headers: { jwtAuth }
      }
    )
    .then(res => res.data)
    .then(({ homeAttributes }) => {
      console.log(" after delete", homeAttributes);
      dispatch(updateAttributes(homeAttributes));
    });
};
