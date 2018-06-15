import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "./actions/uiActions";
import Modal from "./Utilities/Modal";
import Autocomplete from "react-google-autocomplete";

import styled from "styled-components";

class AddressBox extends Component {
  state = {
    formatted_address: "",
    lat: "",
    lng: ""
  };
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
    height: 2.5rem;
  `;
  RoofAddress = styled.div`
    color: white;
    background: #00000082;
    display: inline;
    padding: 3px;
    font-size: 0.9rem;
    cursor: pointer;
  `;
  parseAddress = address => {
    console.log(address);
    const { formatted_address } = address;
    const lat = address.geometry.location.lat();
    const lng = address.geometry.location.lng();
    this.setState({ formatted_address, lat, lng });
  };
  render() {
    const { addy, homeId } = this.props;
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
            <h2>Edit Address</h2>
            <Autocomplete
              onPlaceSelected={place => this.parseAddress(place)}
              types={["address"]}
              style={{ minWidth: "15rem" }}
            />
            <h3>{this.state.formatted_address}</h3>
            <p>lat: {this.state.lat}</p>
            <p>lat: {this.state.lng}</p>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(AddressBox);
