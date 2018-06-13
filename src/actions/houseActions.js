const ADD_HOUSE = "ADD_HOUSE";
const addHouse = obj => dispatch => {
  type: ADD_HOUSE,
    axios.post("http://localhost:8000/house", obj).then(res => {
      console.log("axios response", res);
    });
  dispatch({ type: "SUP" });
};
