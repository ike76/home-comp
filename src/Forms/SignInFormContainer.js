import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SignInForm from "./SignInForm";
import ErrorMessage from "../UIElements/ErrorMessage";
import { SignInUp } from "../UIElements/StyledBoxes";

export class SignInFormContainer extends Component {
  // submit = values => {
  //   console.log("values", values);
  //   this.props.dispatch(loginTHUNK(values));
  // };

  render() {
    if (this.props.currentUser) return <Redirect to="/compare" />;
    return (
      <SignInUp>
        <Typography variant="display1">Sign In</Typography>

        <ErrorMessage />

        <SignInForm />

        <table
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            margin: "2rem",
            padding: ".5rem"
          }}
        >
          <thead>
            <tr colSpan="2">
              <Typography variant="title" color="textSecondary">
                DEMO ACCOUNT:
              </Typography>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Typography variant="subheading" color="textSecondary">
                  email:
                </Typography>
              </th>
              <th>
                <Typography variant="body2">demo@demo.com</Typography>
              </th>
            </tr>
            <tr>
              <td>
                <Typography variant="subheading" color="textSecondary">
                  password:
                </Typography>
              </td>
              <td>
                <Typography variant="body2">demodemo</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </SignInUp>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.user,
  errorMessage: state.auth.error
});
export default connect(mapStateToProps)(SignInFormContainer);
