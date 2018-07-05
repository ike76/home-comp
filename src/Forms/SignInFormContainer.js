import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import SignInForm from "./SignInForm";
import ErrorMessage from "../UIElements/ErrorMessage";
import { SignInUp } from "../UIElements/StyledBoxes";

export class SignInFormContainer extends Component {
  // submit = values => {
  //   console.log("values", values);
  //   this.props.dispatch(loginTHUNK(values));
  // };

  render() {
    const DemoGrid = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      border: 1px lightgrey solid;
      border-radius: 5px;
      padding: 1rem;
      margin: 1rem;
    `;
    if (this.props.currentUser) return <Redirect to="/compare" />;
    return (
      <SignInUp>
        <Typography variant="display1">Sign In</Typography>

        <ErrorMessage />

        <SignInForm />

        <DemoGrid>
          <Typography
            variant="title"
            color="textSecondary"
            style={{ gridColumn: "1/-1" }}
          >
            DEMO ACCOUNT:
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            email:
          </Typography>
          <th>
            <Typography variant="body2">demo@demo.com</Typography>
          </th>
          <Typography variant="subheading" color="textSecondary">
            password:
          </Typography>
          <td>
            <Typography variant="body2">demodemo</Typography>
          </td>
        </DemoGrid>
      </SignInUp>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.user,
  errorMessage: state.auth.error
});
export default connect(mapStateToProps)(SignInFormContainer);
