import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";

export function RegistrationFormContainer(props) {
  if (props.loggedIn) {
    return <Redirect to="/compare" />;
  }
  return <RegistrationForm />;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user
});

export default connect(mapStateToProps)(RegistrationFormContainer);
