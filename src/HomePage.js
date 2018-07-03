import React from "react";
import styled from "styled-components";
import SignInFormContainer from "./Forms/SignInFormContainer";

const HomeDiv = styled.div`
  margin: 1rem auto;
`;

export default () => {
  return (
    <HomeDiv>
      <h1>Home Page</h1>
      <p>introduction introduction etc etc</p>
    </HomeDiv>
  );
};
