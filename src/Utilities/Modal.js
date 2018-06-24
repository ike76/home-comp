import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { closeModal } from "../actions/uiActions";
import CloseButton from "../UIElements/CloseButton";
import Portal from "./Portal";

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
  background: #9e9e9e7a;
  box-shadow: 4px 5px 20px 0px #00000021;
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

export class Modal extends Component {
  closeModal = () => {
    this.props.dispatch(closeModal());
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

export default connect()(Modal);
