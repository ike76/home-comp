import React from "react";
import styled from "styled-components";
export default props => {
  return (
    <Roof>
      <p>{props.addy}</p>
    </Roof>
  );
};

const Roof = styled.div`
  background: lightgrey;
  -webkit-clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
  clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
  margin: -2px -5px;
  text-align: center;
  padding: 0 1rem;
`;
