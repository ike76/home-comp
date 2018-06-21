import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignInForm from "./SignInForm";
import styled from "styled-components";
import { loginTHUNK } from "../actions/authActions";
import { SignInUp } from "../UIElements/StyledBoxes";
import ErrorMessage from "../UIElements/ErrorMessage";
import Button from "../UIElements/Button";
const FormDiv = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  padding: 1rem;
  //   width: 14rem;
  text-align: center;
  margin: 0.5rem;
`;

export class SignInFormContainer extends Component {
  submit = values => {
    this.props.dispatch(loginTHUNK(values));
  };

  render() {
    if (this.props.currentUser) return <Redirect to="/compare" />;
    return (
      <SignInUp>
        <h2>Sign In</h2>

        <ErrorMessage />

        <SignInForm onSubmit={this.submit} />
      </SignInUp>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.user,
  errorMessage: state.auth.error
});
export default connect(mapStateToProps)(SignInFormContainer);
