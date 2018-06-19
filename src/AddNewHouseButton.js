import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import Modal from "./Utilities/Modal";
import HomeFormContainer from "./Forms/HomeFormContainer";

export class AddNewHouseButton extends Component {
  handleClick = () => {
    this.props.dispatch(openModal("new"));
  };
  render() {
    return (
      <Fragment>
        <button onClick={this.handleClick}>Add New Home</button>
        {this.props.modalOpen === "new" && (
          <Modal>
            <HomeFormContainer />
          </Modal>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(AddNewHouseButton);
