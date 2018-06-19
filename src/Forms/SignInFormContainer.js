import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "./SignInForm";
import styled from "styled-components";
import { loginTHUNK } from "../actions/authActions";

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

export class SignInFormContainer extends Component {
  submit = values => {
    this.props.dispatch(loginTHUNK(values));
  };
  render() {
    return (
      <SignInUp>
        <FormDiv>
          <h2>Sign In</h2>
          <SignInForm onSubmit={this.submit} />
        </FormDiv>
        <div>
          <p>current user: {this.props.currentUser} </p>
        </div>
        {/* <FormDiv>
                                  <h2>Sign Up</h2>
                                  <RegistrationFormContainer />
                                </FormDiv> */}
      </SignInUp>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.user.firstName
});
export default connect(mapStateToProps)(SignInFormContainer);
