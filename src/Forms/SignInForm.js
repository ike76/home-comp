import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { loginTHUNK } from "../actions/authActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const SeparationText = styled.p`
  margin: 0.5rem;
  color: lightgrey;
  font-size: 10px;
`;
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

export class SignInForm extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = name => event => {
    console.log("nameevent", name, event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    console.log("formsumbuy");
    const { email, password } = this.state;
    this.props.dispatch(loginTHUNK({ email, password }));
  };

  render() {
    const { pristine, handleSubmit, classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleFormSubmit}
      >
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email2}
          onChange={this.handleChange("email")}
          margin="normal"
        />
        <TextField
          id="passwordn
          "
          label="Password"
          type="password"
          className={classes.textField}
          value={this.state.password2}
          onChange={this.handleChange("password")}
          margin="normal"
        />
        {/* <Field
          component={Input}
          hintText="Email"
          type="email"
          name="email"
          validate={[required, nonEmpty, isTrimmed]}
          label="Email"
          error={false}
        />
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, nonEmpty]}
          label="Password"
        /> */}
        <Button variant="outlined" className={classes.button} type="submit">
          Sign In
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
SignInForm = connect(mapStateToProps)(SignInForm);
export default withStyles(styles)(SignInForm);
// export default withStyles(styles)(reduxForm({ form: "signin" })(SignInForm));
