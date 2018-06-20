import { SubmissionError } from "redux-form";
import axios from "axios";

import { API_BASE_URL } from "../config";
import { addHome, updateAllHomes } from "./houseActions";
import { authRequest } from "./authActions";
import { postProtected, getProtected } from "./serverAPI";

export const getMyStuff = userID => (dispatch, getState) => {
  getProtected({ path: `/userinfo/${userID}`, getState }).then(myStuff =>
    console.log(myStuff)
  );
};

export const getMyHomesTHUNK = userID => (dispatch, getState) => {
  const jwt = getState().auth.authToken;
  console.log("jwt is", jwt);
  axios
    .get(`${API_BASE_URL}/house/getAll`, {
      headers: { jwtAuth: jwt }
    })
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
