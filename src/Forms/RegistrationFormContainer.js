import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { SignInUp } from "../UIElements/StyledBoxes";
import RegistrationForm from "./RegistrationForm";

export function RegistrationFormContainer(props) {
  if (props.loggedIn) {
    return <Redirect to="/compare" />;
  }
  return (
    <SignInUp>
      <RegistrationForm />
    </SignInUp>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user
});

export default connect(mapStateToProps)(RegistrationFormContainer);
