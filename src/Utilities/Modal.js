import React, { Component } from "react";
import styled from "styled-components";

import { CloseButton } from "../UIElements";
import Portal from "./Portal";

export default class Modal extends Component {
  closeModal = () => {
    this.props.close();
  };
  render() {
    return (
      <Portal>
        <ModalWrapper>
          <Card>
            <CloseButton click={this.closeModal} />
            {this.props.children}
          </Card>
        </ModalWrapper>
        <Background onClick={this.closeModal} />
      </Portal>
    );
  }
}

const Card = styled.div`
  width: 300px;
  height: 400px;
  background: white;
  z-index: 10;
  position: absolute;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: #0000009e;
  z-index: 5;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
