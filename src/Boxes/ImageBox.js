import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Attribute } from "../UIElements/StyledText";
import StarRow from "./StarRow";
import CloudinaryDB from "./CloudinaryDB";
import Modal from "../Utilities/Modal";
import { openModal, closeModal } from "../actions/uiActions";
import "./Box.css";
import { editHomeTHUNK } from "../actions/houseActions";

// const cl = new cloudinary.Cloudinary({
//   cloud_name: "homecomp",
//   api_key: "785168849222268",
//   api_secret: "2UZoBuaVETf3ElpxCpUcxZATAAg"
// });
// cloudinary.config({
//   cloud_name: "homecomp",
//   api_key: "785168849222268",
//   api_secret: "2UZoBuaVETf3ElpxCpUcxZATAAg"
// });

class ImageBox extends Component {
  state = {
    selectedFile: null,
    showModal: false,
    imageURL: "",
    rating: 0,
    imagePublicId: ""
  };

  openModal = () => {
    // this.setState({ showModal: true });
    this.props.dispatch(openModal(`image ${this.props.home._id}`));
  };
  closeModal = () => {
    // this.setState({ showModal: false });
    this.props.dispatch(closeModal());
  };
  handleChange = singleUpdate => {
    // singleUpdate should be {value: 3} or {imagePublicId: 'fjdkls'}
    //updateObj should be {value: 3, imagePublicId: 'fdksfj', otherThing: 'othervalue'}
    const updateObj = { [this.props.name.slug]: singleUpdate };
    const homeId = this.props.home._id;
    const homeKey = "attributes";
    const editObj = { homeId, homeKey, updateObj };
    this.props.dispatch(editHomeTHUNK(editObj));
  };
  setImagePublicID = publicId => {
    this.handleChange({ imagePublicId: publicId });

    // const obj = {
    //   homeId: this.props.home._id,
    //   attr: this.props.name.slug,
    //   publicId
    // };
    // this.props.dispatch(setImagePublicID(obj));
  };
  changeRating = newRating => {
    console.log("newRating is", newRating);
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
            <button onClick={this.openModal}>ADD IMAGE</button>
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
          <Modal close={this.closeModal}>
            <CloudinaryDB setImagePublicID={this.setImagePublicID} />
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
