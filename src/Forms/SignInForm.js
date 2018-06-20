import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import Button from "../UIElements/Button";
import Input from "./Input";
import { required, nonEmpty, isTrimmed } from "./validators/userValidator";
import { Link } from "react-router-dom";

export class SignInForm extends Component {
  render() {
    const { pristine, handleSubmit } = this.props;
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <Field
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
        />
        <ButtonDiv>
          <Button text="SIGN IN" type="submit" disabled={pristine} />
          <SeparationText>- or -</SeparationText>
          <Link to="/signup">
            <Button text="SIGN UP" />
          </Link>
        </ButtonDiv>
      </form>
    );
  }
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const SeparationText = styled.p`
  margin: 0.5rem;
  color: lightgrey;
  font-size: 10px;
`;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
SignInForm = connect(mapStateToProps)(SignInForm);

export default reduxForm({ form: "signin" })(SignInForm);
