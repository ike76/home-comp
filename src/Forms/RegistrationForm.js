import React from "react";
import { Field, reduxForm, focus } from "redux-form";

import { registerUser } from "../actions/authActions";
import Input from "./Input";
import { SignInUp } from "../UIElements/StyledBoxes";
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from "./validators/userValidator";

import Button from "../UIElements/Button";
import "./forms.css";

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { email, password, firstName, lastName } = values;
    const user = { email, password, firstName, lastName };
    this.props.dispatch(registerUser(user));
  }

  render() {
    return (
      <SignInUp>
        <h2>Sign Up</h2>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <Field
            component={Input}
            type="text"
            name="firstName"
            label="First Name"
          />
          <Field
            component={Input}
            type="text"
            name="lastName"
            label="Last Name"
          />
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
            validate={[required, passwordLength, isTrimmed]}
            label="Password"
          />
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            validate={[required, nonEmpty, matchesPassword]}
            label="Confirm Password"
          />
          <Button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
            text="Register"
          />
        </form>
      </SignInUp>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
