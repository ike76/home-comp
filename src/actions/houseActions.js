import { postProtected, deleteProtected, getProtected } from "./serverAPI";

export const SORT_HOMES = "SORT_HOMES";
export const sortHomes = (attr, ascending) => ({
  type: SORT_HOMES,
  attr,
  ascending
});

export const getMyHomes = () => dispatch => {
  dispatch(homesRequest());
  getProtected("/house/getAll")
    .then(newHomes => {
      dispatch(homesSuccess(newHomes));
      // dispatch(updateAllHomes(newHomes));
    })
    .catch(err => console.log("get my homes error", err));
};

export const HOMES_REQUEST = "HOMES_REQUEST";
export const homesRequest = () => ({
  type: HOMES_REQUEST
});
export const HOMES_SUCCESS = "HOMES_SUCCESS";
export const homesSuccess = homes => ({
  type: HOMES_SUCCESS,
  homes
});
export const HOMES_ERROR = "HOMES_ERROR";
export const homesError = error => ({
  type: HOMES_ERROR,
  error
});

export const addHome = houseObj => dispatch => {
  postProtected("/house", { location: houseObj }).then(house => {
    dispatch(addHome_SUCCESS(house));
  });
};
export const ADD_HOME_SUCCESS = "ADD_HOME_SUCCESS";
export const addHome_SUCCESS = house => ({
  type: ADD_HOME_SUCCESS,
  house
});

export const editHome = ({ homeId, homeKey, updateObj }) => dispatch => {
  postProtected(`/house/${homeId}`, { homeKey, updateObj }).then(
    updatedHouse => {
      dispatch(editHome_SUCCESS(updatedHouse));
    }
  );
};
export const EDIT_HOME_SUCCESS = "EDIT_HOME_SUCCESS";
export const editHome_SUCCESS = updatedHouse => ({
  type: EDIT_HOME_SUCCESS,
  updatedHouse
});

export const removeHome = homeId => dispatch => {
  deleteProtected(`/house/${homeId}`)
    .then(remainingHomes => {
      dispatch(updateAllHomes(remainingHomes));
    })
    .catch(err => console.log(err));
};

export const UPDATE_ALL_HOMES = "UPDATE_ALL_HOMES";
export const updateAllHomes = homes => ({
  type: UPDATE_ALL_HOMES,
  homes
});

export const addAttribute = newAttributes => dispatch => {
  postProtected(`/user/attributes`, { newAttributes }).then(
    ({ homeAttributes }) => {
      dispatch(updateAttributes(homeAttributes));
    }
  );
};
export const UPDATE_ATTRIBUTES = "UPDATE_ATTRIBUTES";
export const updateAttributes = attrNames => ({
  type: UPDATE_ATTRIBUTES,
  attrNames
});

export const RESET_STORE = "RESET_STORE";
export const resetStore = () => ({
  type: RESET_STORE
});

export const deleteAttribute = attrId => dispatch => {
  postProtected(`/user/deleteAttribute/${attrId}`, {}).then(
    ({ homeAttributes }) => {
      dispatch(updateAttributes(homeAttributes));
    }
  );
};

export const moveAttribute = (i, delta) => dispatch => {
  postProtected("/user/moveAttribute", { i, delta })
    .then(attributes => dispatch(updateAttributes(attributes)))
    .catch(err => console.log(err));
};
