import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

// import Button from "../UIElements/Button";
import "./forms.css";
import { withStyles } from "@material-ui/core";

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches("password");

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

export class RegistrationForm extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: ""
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onSubmit(values) {
    const { email, password, firstName, lastName } = values;
    const user = { email, password, firstName, lastName };
    this.props.dispatch(registerUser(user));
  }
  render() {
    const { classes } = this.props;
    return (
      <SignInUp>
        <h2>Sign Up</h2>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          autoComplete="off"
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            value={this.state.email}
          />
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange("firstName")}
            margin="normal"
            value={this.state.firstName}
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange("lastName")}
            margin="normal"
            value={this.state.lastName}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
          />
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            type="password"
            className={classes.textField}
            value={this.state.passwordConfirm}
            onChange={this.handleChange("passwordConfirm")}
            margin="normal"
          />
          {/* <Field
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
          /> */}
        </form>
      </SignInUp>
    );
  }
}

export default withStyles(styles)(
  reduxForm({
    form: "registration",
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus("registration", Object.keys(errors)[0]))
  })(RegistrationForm)
);
