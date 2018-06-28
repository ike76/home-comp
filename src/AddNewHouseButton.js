import React, { Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import styled from "styled-components";
import Modal from "./Utilities/Modal";
import HomeForm from "./Forms/HomeForm";

export const AddNewHouseButton = props => {
  const { modalOpen, dispatch } = props;
  const handleClick = () => {
    dispatch(openModal("new"));
  };
  const StyledButton = styled.button`
    display: inline-block;
    height: 3rem;
    background: #ffffff96;
    align-self: center;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #542020;
  `;
  return (
    <Fragment>
      <StyledButton onClick={handleClick}>Add New Home</StyledButton>
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
