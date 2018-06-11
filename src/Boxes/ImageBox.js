import React, { Component } from "react";
import styled from "styled-components";
import { Image, CloudinaryContext } from "cloudinary-react";
import cloudinary from "cloudinary-core";
import { connect } from "react-redux";
import { thunkDisplayMessage, getHouse } from "../actions/actions";
import { Value, Attribute } from "../UIElements/StyledText";
import StarRow from "./StarRow";
import "./Box.css";

const cl = new cloudinary.Cloudinary({
  cloud_name: "homecomp",
  api_key: "785168849222268",
  api_secret: "2UZoBuaVETf3ElpxCpUcxZATAAg"
});
// cloudinary.config({
//   cloud_name: "homecomp",
//   api_key: "785168849222268",
//   api_secret: "2UZoBuaVETf3ElpxCpUcxZATAAg"
// });

class ImageBox extends Component {
  state = {
    selectedFile: null
  };

  doMessage = message => {
    this.props.dispatch(getHouse(1234));
  };
  render() {
    const image = `https://res.cloudinary.com/homecomp/image/upload/v1528742172/kitchen2.jpg`;
    const { home, name, heights } = this.props;
    const StyledBox = styled.div`
      height: ${heights.image};
      display: grid;
      align-content: end;
      background-image: linear-gradient(#0000, #00000000 40%, #000000b3 90%),
        url(${image});
      background-size: cover;
    `;
    return (
      <StyledBox className="box">
        <StarRow home={home} name={name.slug} style={{ zIndex: "5" }} />
        <Attribute style={{ zIndex: "5" }}>{name.pretty}</Attribute>
      </StyledBox>
    );
  }
}
const mapStateToProps = state => ({
  displayMessage: state.main.displayMessage,
  heights: state.main.heights
});
export default connect(mapStateToProps)(ImageBox);
