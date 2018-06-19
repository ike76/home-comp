import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import slugify from "slugify";
import uuid from "uuid";
import Box from "../Boxes/Box";
import ImageBox from "../Boxes/ImageBox";
import MapBox from "../Boxes/MapBox";
import { addAttribute } from "../actions/houseActions";
import Button from "../UIElements/Button";
import Autocomplete from "react-google-autocomplete";
import { parseAddress } from "../Utilities/parseGoogleAddress";

class FormContainer extends Component {
  state = {
    attrType: "price",
    attrName: ""
  };
  setAttrType = attrType => {
    this.setState({ attrType });
  };
  updateAttrName = e => {
    this.setState({ attrName: e.target.value });
  };
  handleGoogleOutput = place => {
    console.log(parseAddress(place));
  };
  submit = () => {
    const pretty = this.state.attrName;
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const attrType = this.state.attrType;
    const id = uuid();
    const attrObject = { pretty, slug, type: attrType, id };
    this.props.dispatch(addAttribute([attrObject]));
  };
  types = [
    { slug: "price", pretty: "Price" },
    { slug: "number", pretty: "Number" },
    { slug: "image", pretty: "Image / Rating" },
    { slug: "map", pretty: "Map / Distance" }
  ];

  render() {
    const boxType = () => {
      switch (this.state.attrType) {
        case "price":
        case "number":
          return <Box {...boxAttributes} />;
        case "image":
          return <ImageBox {...boxAttributes} />;
        case "map":
          return (
            <Fragment>
              <div>
                <h3>Distance:</h3>
                <p>
                  You can sort houses by their distance (driving) from any
                  address. For example, Name this Attribute "To Work" and enter
                  your work address here:
                </p>
                <Autocomplete
                  onPlaceSelected={place => this.handleGoogleOutput(place)}
                  types={["address"]}
                  style={{ minWidth: "15rem" }}
                />
              </div>
              <MapBox {...boxAttributes} />
            </Fragment>
          );
        default:
          return null;
      }
    };
    const boxAttributes = {
      home: { attributes: {}, location: {} },
      slug: "slug",
      name: { type: this.state.attrType },
      dispatch: () => {},
      heights: this.props.heights
    };
    return (
      <NewAttrGrid>
        <h2> Add New Attribute</h2>
        <label htmlFor="attrName"> Name:</label>
        <input
          id="attrName"
          onChange={this.updateAttrName}
          value={this.state.attrName}
          type="text"
        />
        <div>
          {this.types.map((type, i) => (
            <Button
              key={type.slug}
              text={type.pretty}
              click={() => this.setState({ attrType: type.slug })}
              className={this.state.attrType === type.slug ? "selected" : null}
              selected={type.slug === this.state.attrType}
            />
          ))}
        </div>
        <div>
          <h3>{this.state.attrName}</h3>

          {boxType()}
        </div>
        <Button text="Save" click={this.submit} />
      </NewAttrGrid>
    );
  }
}
const NewAttrGrid = styled.div`
  display: grid;
  grid-gap: 6px;
  padding: 1rem;
`;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames,
  home: state.house[0],
  heights: state.house.heights
});
export default connect(mapStateToProps)(FormContainer);
