import React from "react";
import styled from "styled-components";

const Button = props => {
  const { text, click } = props;
  const StyledButton = styled.button`
    padding: 4px 6px;
    border-radius: 3px;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #eef7e3;
      border: 1px green solid;
      font-weight: bold;
    }
  `;
  return <StyledButton onClick={click}>{text}</StyledButton>;
};

export default Button;
