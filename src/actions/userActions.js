import { SubmissionError } from "redux-form";
import axios from "axios";

import { API_BASE_URL } from "../config";
import { addHome, updateAllHomes, updateAttributes } from "./houseActions";
import { authRequest } from "./authActions";
import { postProtected, getProtected } from "./serverAPI";

export const getMyHomesTHUNK = userID => (dispatch, getState) => {
  getProtected({ path: "/house/getAll", getState }).then(newHomes => {
    console.log("houses from axios", newHomes);
    dispatch(updateAllHomes(newHomes));
  });
};

export const getMyAttributes = () => (dispatch, getState) => {
  getProtected({ path: `/user/userinfo`, getState }).then(
    ({ homeAttributes }) => {
      console.log("homeAttributes", homeAttributes);
      dispatch(updateAttributes(homeAttributes));
    }
  );
};

export const GET_MY_HOMES = "GET_MY_HOMES";
export const getMyHomes = userID => ({
  type: GET_MY_HOMES,
  userID
});
