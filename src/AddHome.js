import React, { Component, Fragment } from "react";
import Modal from "./Utilities/Modal";
import NewHomeForm from "./Forms/NewHomeForm";

export default class AddHome extends Component {
  state = {
    showModal: false
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  handleSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <Fragment>
        <button onClick={this.openModal}>ADD HOME</button>
        {this.state.showModal && (
          <Modal close={this.closeModal}>
            <NewHomeForm onSubmit={this.handleSubmit} />
          </Modal>
        )}
      </Fragment>
    );
  }
}
