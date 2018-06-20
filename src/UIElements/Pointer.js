import React from "react";
import styled from "styled-components";
import "./Pointer.css";

const PointerDiv = styled.div`
  position: relative;
`;
export default props => {
  const Pointer = styled.div`
    position: absolute;
    left: -1.5rem;
    color: mediumblue;
    font-size: 1.5rem;
    visibility: ${props.show ? "visible" : "hidden"};
  `;
  return (
    <PointerDiv>
      <Pointer>
        <i class="far fa-hand-point-right blink_me" />
      </Pointer>
      {props.children}
    </PointerDiv>
  );
};
