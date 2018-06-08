import React from "react";
import styled from "styled-components";
export default props => (
  <CloseButton className="far fa-window-close" onClick={props.click} />
);

const CloseButton = styled.i`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 2rem;
  color: grey;
  transition: 0.5s;
  &:hover {
    color: red;
  }
`;
