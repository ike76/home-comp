import React, { Component } from "react";
import styled from "styled-components";

export default class DumBox extends Component {
  render() {
    return (
      <Box>
        <p>Duh.</p>
      </Box>
    );
  }
}

const Box = styled.div`
  border: 1px black solid;
  border-radius: 4px;
  width: 15rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;
