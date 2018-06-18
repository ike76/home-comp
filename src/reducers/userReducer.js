import { LOGIN_USER } from "../actions/userActions";
import { ADMIN_ID } from "../config";
const initialState = {
  userId: ADMIN_ID, // sam@sam.com powerpow
  firstName: "",
  lastName: "",
  email: "",
  loggedIn: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const { user } = action;
      console.log("loginUser", user);
      return { ...state, loggedIn: true, user };
    }
    default:
      return state;
  }
};
