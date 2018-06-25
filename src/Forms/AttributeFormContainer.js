import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import slugify from "slugify";
import uuid from "uuid";
import { addAttribute } from "../actions/houseActions";
import Button from "../UIElements/Button";
import Autocomplete from "react-google-autocomplete";
import { parseAddress } from "../Utilities/parseGoogleAddress";
import { explanation } from "./boxTypeExplanations";
import Pointer from "../UIElements/Pointer";

class FormContainer extends Component {
  state = {
    attrType: "",
    attrName: "",
    address: {},
    savable: false,
    submitted: false,
    nextStep: "attrType"
  };

  pointerPicker = () => {
    let array = [];
    if (!this.state.attrType) array.push("attrType");
    if (!this.state.attrName) array.push("attrName");
    if (this.state.attrType === "map" && !this.state.address.lat)
      array.push("map");
    if (!this.state.submitted) array.push("submit");
    return array[0];
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.attrType !== this.state.attrType ||
      prevState.attrName !== this.state.attrName ||
      prevState.address.lat !== this.state.address.lat ||
      prevState.submitted !== this.state.submitted
    )
      this.setState({ nextStep: this.pointerPicker() });
  }
  savable = () => {
    switch (this.state.attrType) {
      case "map":
        return this.state.attrName && this.state.address.lat;
      case "price":
      case "number":
      case "image":
        return this.state.attrName;
      default:
        return false;
    }
  };

  setAttrType = attrType => {
    this.setState({ attrType });
  };
  updateAttrName = e => {
    this.setState({ attrName: e.target.value });
  };
  handleGoogleOutput = place => {
    this.setState({ address: parseAddress(place) });
  };
  resetOptions = () => {
    this.setState({
      attrType: "",
      attrName: "",
      address: {},
      savable: false,
      submitted: false,
      nextStep: "attrType"
    });
  };
  submit = () => {
    const attrType = this.state.attrType;
    const pretty = this.state.attrName;
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const id = uuid();
    let attrObject = { pretty, slug, type: attrType, id };
    if (this.state.attrType === "map") {
      const { lat, lng, address } = this.state.address;
      attrObject = { ...attrObject, lat, lng, address };
    }
    this.props.dispatch(addAttribute([attrObject]));
    this.resetOptions();
  };

  types = [
    { slug: "price", pretty: "Price" },
    { slug: "number", pretty: "Number" },
    { slug: "image", pretty: "Photo" },
    { slug: "map", pretty: "Map" }
  ];

  render() {
    const placeholders = {
      price: "List Price, HOA Fee, Monthly Payment etc...",
      number: "Bedrooms, Bathrooms, Floors etc...",
      image: "Kitchen, Back Yard, Curb Appeal etc...",
      map: "To Work, To Mall, To Mom's, etc..."
    };

    return (
      <NewAttrGrid>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{this.state.attrName || "Add New Attribute"}</h3>
          {this.state.attrType === "map" && <p>{this.state.address.address}</p>}
        </div>
        <div>
          <label htmlFor="attrType">1. Pick a Type:</label>
          <Pointer show={this.state.nextStep === "attrType"}>
            <ButtonRow>
              {this.types.map((type, i) => (
                <Button
                  key={type.slug}
                  text={type.pretty}
                  click={() => this.setState({ attrType: type.slug })}
                  className={
                    this.state.attrType === type.slug ? "selected" : null
                  }
                  selected={type.slug === this.state.attrType}
                />
              ))}
              <Spacer>|</Spacer>
              <Pointer show={this.state.nextStep === "submit"}>
                <Button
                  text="Save"
                  click={this.submit}
                  disabled={!this.savable()}
                />
              </Pointer>
            </ButtonRow>
          </Pointer>
        </div>
        <label htmlFor="attrName">2. Pick a Name:</label>
        <Pointer show={this.state.nextStep === "attrName"}>
          <input
            id="attrName"
            onChange={this.updateAttrName}
            value={this.state.attrName}
            type="text"
            placeholder={placeholders[this.state.attrType]}
          />
        </Pointer>
        {this.state.attrType === "map" && (
          <div>
            <label htmlFor="googAutoComplete">3. Distance to Where?</label>
            <Pointer show={this.state.nextStep === "map"}>
              <Autocomplete
                onPlaceSelected={place => this.handleGoogleOutput(place)}
                types={["address"]}
                style={{ width: "100%" }}
                id="googAutoComplete"
              />
            </Pointer>
          </div>
        )}
        <div>{explanation(this.state.attrType)}</div>
      </NewAttrGrid>
    );
  }
}
const NewAttrGrid = styled.div`
  display: grid;
  grid-gap: 6px;
  padding: 1rem;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
const Spacer = styled.span`
  color: #e8e8e8;
  margin: 0 8px;
`;
const mapStateToProps = state => ({
  attrNames: state.house.attrNames,
  home: state.house[0],
  heights: state.house.heights
});
export default connect(mapStateToProps)(FormContainer);
