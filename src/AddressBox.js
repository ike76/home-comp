import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import Modal from "./Utilities/Modal";
import HomeFormContainer from "./Forms/HomeFormContainer";
import styled from "styled-components";

class AddressBox extends Component {
  Roof = styled.div`
    background: lightgrey;
    background-image: url(${this.props.roofImage});
    background-size: 200px 70px;
    -webkit-clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    margin: -4px -10px;
    text-align: center;
    padding: 0 1rem;
    grid-area: 1 / ${this.props.colNumber} / 2 / ${this.props.colNumber};
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: ${this.props.heights.roof};
  `;
  RoofAddress = styled.div`
    color: white;
    background: #00000082;
    display: inline;
    padding: 3px;
    font-size: 12px;
    cursor: pointer;
  `;

  render() {
    const { addy, homeId, home } = this.props;
    const handleClickRoof = () => {
      console.log(homeId);
      this.props.dispatch(openModal(homeId));
    };
    return (
      <Fragment>
        <this.Roof>
          <a href="#" onClick={handleClickRoof}>
            <this.RoofAddress>{addy}</this.RoofAddress>
          </a>
        </this.Roof>
        {this.props.modalOpen === homeId && (
          <Modal>
            <HomeFormContainer home={home} />
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modalOpen: state.ui.modalOpen,
  heights: state.house.heights
});
export default connect(mapStateToProps)(AddressBox);
