import React from "react";
import { reduxForm, focus } from "redux-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ErrorMessage from "../UIElements/ErrorMessage";

import { registerUser } from "../actions/authActions";
import { media } from "../Utilities/style-utils";

// import Button from "../UIElements/Button";
import "./forms.css";
import { withStyles } from "@material-ui/core";

const RegistrationGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 1rem;
  justify-content: center;
  justify-items: center;
  ${media.handheld`
    grid-template-columns: max-content;
  `};
`;

const styles = theme => ({
  root: { flexGrow: 1, margin: "0 auto" },
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
  },
  textField2Rows: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    gridColumn: "1/-1"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

export class RegistrationForm extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    passwordsOK: true
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    const { password, passwordConfirm } = this.state;
    if (passwordConfirm && password !== passwordConfirm) {
      this.setState({ passwordsOK: false });
    } else {
      this.setState({ passwordsOK: true });
    }
  };
  onSubmit() {
    const { email, password, firstName, lastName } = this.state;
    const user = { email, password, firstName, lastName };
    this.props.dispatch(registerUser(user));
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ErrorMessage />
        <ValidatorForm
          ref="form"
          onSubmit={this.onSubmit}
          data-test="login-form"
          autoComplete="off"
        >
          <RegistrationGrid>
            <div style={{ gridColumn: "1/-1" }}>
              <Typography variant="display1">Sign Up</Typography>
            </div>
            <TextValidator
              name="email"
              id="email"
              label="Email"
              className={classes.textField2Rows}
              type="email"
              onChange={this.handleChange("email")}
              margin="normal"
              value={this.state.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "Must be valid email"]}
            />
            <TextField
              name="firstName"
              id="firstName"
              label="First Name"
              type="text"
              className={classes.textField}
              onChange={this.handleChange("firstName")}
              margin="normal"
              value={this.state.firstName}
            />
            <TextField
              name="lastName"
              id="lastName"
              label="Last Name"
              type="text"
              className={classes.textField}
              onChange={this.handleChange("lastName")}
              margin="normal"
              value={this.state.lastName}
            />

            <TextValidator
              name="password"
              id="password"
              label="Password"
              type="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              name="passwordConfirm"
              id="passwordConfirm"
              label="Confirm Password"
              type="password"
              className={classes.textField}
              value={this.state.passwordConfirm}
              onChange={this.handleChange("passwordConfirm")}
              margin="normal"
              validators={["isPasswordMatch", "required"]}
              errorMessages={["Passwords must match", "this field is required"]}
            />
            <div style={{ gridColumn: "1/-1" }}>
              <Button variant="outlined" color="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </RegistrationGrid>
        </ValidatorForm>
      </div>
    );
  }
}

export const RegFormWithStyles = withStyles(styles)(RegistrationForm);

export default withStyles(styles)(
  reduxForm({
    form: "registration",
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus("registration", Object.keys(errors)[0]))
  })(RegistrationForm)
);
