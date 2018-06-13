import axios from "axios";

export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addHome = houseObj => dispatch => {
  axios
    .post("http://localhost:8000/house", houseObj)
    .then(response => response.data)
    .then(house => {
      console.log("axios response", house);
      dispatch({ type: ADD_NEW_HOME, house });
    });
};
