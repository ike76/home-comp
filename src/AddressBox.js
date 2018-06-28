import React, { Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import Modal from "./Utilities/Modal";
import HomeForm from "./Forms/HomeForm";
import styled from "styled-components";

const AddressBox = props => {
  const { addy, homeId, home, dispatch, modalOpen, heights, roofImage } = props;
  const Roof = styled.div`
    background: lightgrey;
    background-image: url(${roofImage});
    background-size: 200px 70px;
    -webkit-clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    margin: -4px -10px;
    text-align: center;
    padding: 0 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: ${heights.roof};
  `;
  const RoofAddress = styled.div`
    color: white;
    background: #00000082;
    display: inline;
    padding: 3px;
    font-size: 12px;
    cursor: pointer;
  `;

  const handleClickRoof = () => {
    dispatch(openModal(homeId));
  };
  return (
    <Fragment>
      <Roof>
        <a onClick={handleClickRoof}>
          <RoofAddress>{addy}</RoofAddress>
        </a>
      </Roof>
      {modalOpen === homeId && (
        <Modal>
          <HomeForm home={home} />
        </Modal>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  modalOpen: state.ui.modalOpen,
  heights: state.house.heights
});
export default connect(mapStateToProps)(AddressBox);
