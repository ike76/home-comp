import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Image } from "cloudinary-react";

import { getHouse, setImagePublicID } from "../actions/actions";
import { Attribute } from "../UIElements/StyledText";
import StarRow from "./StarRow";
import ImageDropBox from "./ImageDropBox";
import CloudinaryDB from "./CloudinaryDB";
import Modal from "../Utilities/Modal";
import "./Box.css";

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
    imageURL: ""
  };

  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  setImagePublicID = publicId => {
    const obj = {
      homeId: this.props.home._id,
      attr: this.props.name.slug,
      publicId
    };
    this.props.dispatch(setImagePublicID(obj));
  };
  setImageURL = url => {
    this.setState({ imageURL: url });
  };
  render() {
    const { home, name, heights } = this.props;
    const imagePublicId = home.attributes[name.slug].imagePublicId;
    const image = `http://res.cloudinary.com/homecomp/image/upload/c_scale,w_300/v1528808824/${imagePublicId}.jpg`;
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
          <StarRow home={home} name={name.slug} style={{ zIndex: "5" }} />
          <Attribute style={{ zIndex: "5" }}>{name.pretty}</Attribute>
        </StyledBox>
        {this.state.showModal && (
          <Modal close={this.closeModal}>
            <CloudinaryDB setImagePublicID={this.setImagePublicID} />
          </Modal>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  displayMessage: state.main.displayMessage,
  heights: state.main.heights
});
export default connect(mapStateToProps)(ImageBox);
