import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

import Input from "./Input";
import { required, nonEmpty, isTrimmed } from "./validators/userValidator";

export class SignInForm extends Component {
  render() {
    const { pristine, handleSubmit } = this.props;
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <Field
          component={Input}
          type="text"
          name="email"
          validate={[required, nonEmpty, isTrimmed]}
          label="Email"
        />
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, nonEmpty]}
          label="Password"
        />
        <ButtonDiv>
          <button type="submit" disabled={pristine}>
            SIGN IN
          </button>
        </ButtonDiv>
      </form>
    );
  }
}

const ButtonDiv = styled.div``;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
SignInForm = connect(mapStateToProps)(SignInForm);

export default reduxForm({ form: "newHome" })(SignInForm);
