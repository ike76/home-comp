import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

import Input from "./Input";
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from "./validators/userValidator";
export class SignInForm extends Component {
  render() {
    const { pristine, validate } = this.props;
    return (
      <div className="login-form" onSubmit={this.props.handleSubmit}>
        <Field
          component={Input}
          type="text"
          name="email"
          validate={[required, nonEmpty, isTrimmed]}
          label="Email"
        />
        <Field
          component={Input}
          type="text"
          name="password"
          validate={[required, nonEmpty]}
          label="Password"
        />
        <ButtonDiv>
          <button type="submit" disabled={pristine}>
            SIGN IN
          </button>
        </ButtonDiv>
      </div>
    );
  }
}

const ButtonDiv = styled.div``;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
SignInForm = connect(mapStateToProps)(SignInForm);

export default reduxForm({ form: "newHome" })(SignInForm);
