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
    default:
      return state;
  }
};
