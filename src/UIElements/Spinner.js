import React from "react";
import styled from "styled-components";

export default props => {
  return props.fullScreen ? (
    <SpinnerDivFixed>
      <Spinner className="fas fa-spinner fa-pulse" />
    </SpinnerDivFixed>
  ) : (
    <SpinnerDiv>
      <Spinner className="fas fa-spinner fa-pulse" />
    </SpinnerDiv>
  );
};

const SpinnerDivFixed = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  height: 100vh;
  width: 100vw;
  background: #ffffff9e;
  position: fixed;
  top: 0;
  left: 0;
`;
const Spinner = styled.i`
  position: absolute;
  top: 40vh;
  color: #80808085;
`;

const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  height: 100%;
  width: 100%;
  background: #ffffff9e;
`;
