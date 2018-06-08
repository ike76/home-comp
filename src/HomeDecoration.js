import React, { Component } from "react";
import styled from "styled-components";

export default class componentName extends Component {
  columnNumber = this.props.index + 2;
  Siding = styled.div`
    grid-area: 2 / ${this.columnNumber} / -1 / ${this.columnNumber};
    background: lightblue;
  `;
  render() {
    return <this.Siding>YO</this.Siding>;
  }
}
