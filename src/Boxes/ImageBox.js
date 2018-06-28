import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Attribute } from "../UIElements/StyledText";
import StarRow from "./StarRow";
import CloudinaryDB from "./CloudinaryDB";
import Modal from "../Utilities/Modal";
import { openModal, closeModal } from "../actions/uiActions";
import { editHome } from "../actions/houseActions";
import "./Box.css";

export class ImageBox extends Component {
  state = {
    selectedFile: null,
    showModal: false,
    imageURL: "",
    rating: 0,
    imagePublicId: ""
  };

  openModal = () => {
    this.props.dispatch(openModal(`image ${this.props.home._id}`));
  };
  closeModal = () => {
    this.props.dispatch(closeModal());
  };
  handleChange = singleUpdate => {
    const updateObj = { [this.props.name.slug]: singleUpdate };
    const homeId = this.props.home._id;
    const homeKey = "attributes";
    const editObj = { homeId, homeKey, updateObj };
    this.props.dispatch(editHome(editObj));
  };
  setImagePublicID = publicId => {
    this.handleChange({ imagePublicId: publicId });
  };
  changeRating = newRating => {
    this.handleChange({ value: newRating });
  };
  setImageURL = url => {
    this.setState({ imageURL: url });
  };
  render() {
    const { home, name, heights } = this.props;
    const imagePublicId =
      home.attributes[name.slug] && home.attributes[name.slug].imagePublicId;
    const image =
      imagePublicId &&
      `http://res.cloudinary.com/homecomp/image/upload/c_scale,w_300/v1528808824/${imagePublicId}.jpg`;
    const StyledBox = styled.div`
      height: ${heights.image};
      display: grid;
      align-content: end;
      background-image: linear-gradient(#0000, #00000000 40%, #000000b3 90%),
        url(${image});
      background-size: cover;
    `;
    return (
      <Fragment>
        <StyledBox className="box ">
          {!imagePublicId && (
            <button onClick={this.openModal} data-test="add-image-button">
              ADD IMAGE
            </button>
          )}
          <StarRow
            home={home}
            name={name.slug}
            style={{ zIndex: "5" }}
            changeRating={this.changeRating}
          />
          <Attribute style={{ zIndex: "5" }}>{name.pretty}</Attribute>
        </StyledBox>
        {this.props.modalOpen === `image ${this.props.home._id}` && (
          <Modal close={this.closeModal} data-test="modal">
            <CloudinaryDB
              setImagePublicID={this.setImagePublicID}
              closeModal={this.closeModal}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  heights: state.house.heights,
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(ImageBox);
