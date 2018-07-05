import React, { Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import Button from "@material-ui/core/Button";

import Modal from "./Utilities/Modal";
import HomeForm from "./Forms/HomeForm";

export const AddNewHouseButton = props => {
  const { modalOpen, dispatch } = props;
  const handleClick = () => {
    dispatch(openModal("new"));
  };

  return (
    <Fragment>
      <Button onClick={handleClick}>Add New Home</Button>
      {modalOpen === "new" && (
        <Modal>
          <HomeForm />
        </Modal>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(AddNewHouseButton);
