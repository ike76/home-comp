import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { authError } from "../actions/authActions";

const ErrorMessageDiv = styled.p`
  color: red;
  font-size: 0.8rem;
  border: 1px solid red;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: red;
    color: white;
  }
`;

export const ErrorMessage = props => {
  return (
    props.errorMessage && (
      <ErrorMessageDiv onClick={() => props.dispatch(authError(""))}>
        {props.errorMessage}
      </ErrorMessageDiv>
    )
  );
};
const mapStateToProps = state => ({
  errorMessage: state.auth.error
});
export default connect(mapStateToProps)(ErrorMessage);
