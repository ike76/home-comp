import React, { Component } from "react";
import SignInForm from "./SignInForm";
import styled from "styled-components";
import { RegistrationFormContainer } from "./RegistrationFormContainer";
export default class SignInFormContainer extends Component {
  submit = values => {
    console.log(values);
  };
  render() {
    return (
      <SignInUp>
        <FormDiv>
          <h2>Sign In</h2>
          <SignInForm onSubmit={this.submit} />
        </FormDiv>
        <FormDiv>
          <h2>Sign Up</h2>
          <RegistrationFormContainer />
        </FormDiv>
      </SignInUp>
    );
  }
}

const FormDiv = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  padding: 1rem;
  //   width: 14rem;
  text-align: center;
  margin: 0.5rem;
`;
const SignInUp = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
