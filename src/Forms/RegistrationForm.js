import React from "react";
import { reduxForm, focus } from "redux-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { registerUser } from "../actions/authActions";
import { matches, length, isTrimmed } from "./validators/userValidator";
import { media } from "../Utilities/style-utils";

// import Button from "../UIElements/Button";
import "./forms.css";
import { withStyles } from "@material-ui/core";

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches("password");

const RegistrationGrid = styled.form`
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
      <div>
        <RegistrationGrid
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          autoComplete="off"
          data-test="login-form"
        >
          <h2 style={{ gridColumn: "1/-1" }}>Sign Up</h2>
          <TextField
            id="email"
            label="Email"
            className={classes.textField2Rows}
            type="email"
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
          <div style={{ gridColumn: "1/-1" }}>
            <Button variant="outlined" color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </RegistrationGrid>
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
