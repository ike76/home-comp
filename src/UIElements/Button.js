import React from "react";
import styled from "styled-components";

const Button = props => {
  const { text, click, selected, disabled } = props;
  const StyledButton = styled.button`
    padding: 4px 6px;
    border-radius: 3px;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #eef7e3;
      color: black;
      border: 1px green solid;
      font-weight: bold;
    }
    &:disabled {
      background: #e6e6e6;
      opacity: 0.5;
      cursor: not-allowed;
    }
    ${selected ? "background: #679a2b; color: white;" : null};
  `;
  return (
    <StyledButton onClick={click} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default Button;
