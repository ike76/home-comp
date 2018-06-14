import { SubmissionError } from "redux-form";
import axios from "axios";

import { API_BASE_URL } from "../config";

// export const registerUserOLD = user => dispatch => {
//   return (
//     fetch(`${API_BASE_URL}/user`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify(user)
//     })
//       // .then(res => normalizeResponseErrors(res))
//       .then(res => res.json())
//       .catch(err => {
//         const { reason, message, location } = err;
//         if (reason === "ValidationError") {
//           // Convert ValidationErrors into SubmissionErrors for Redux Form
//           return Promise.reject(
//             new SubmissionError({
//               [location]: message
//             })
//           );
//         }
//       })
//   );
// };

export const registerUser = user => dispatch => {
  return axios
    .post(`${API_BASE_URL}/auth/signup`, user)
    .then(res => res.data)
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const login = (email, password) => dispatch => {
  return axios
    .post(`${API_BASE_URL}/auth/signin`, { email, password })
    .then(res => res.data)
    .catch(err => {
      console.log("signin error", err);
    });
};
