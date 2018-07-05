import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { loginTHUNK } from "../actions/authActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    this.setState({
      [name]: event.target.value
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.dispatch(loginTHUNK({ email, password }));
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleFormSubmit}
        // onSubmit={props.handleSubmit}
      >
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange("email")}
          margin="normal"
        />
        <TextField
          id="passwordn
          "
          label="Password"
          type="password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange("password")}
          margin="normal"
        />

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
