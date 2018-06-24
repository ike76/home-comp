import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import { parseAddress } from "../Utilities/parseGoogleAddress";

import { addHome, editHome, removeHome } from "../actions/houseActions";
import { connect } from "react-redux";
import { closeModal } from "../actions/uiActions";

export class HomeFormContainer extends Component {
  state = {
    formatted_address: "",
    address: "",
    lat: "",
    lng: "",
    zip: ""
  };
  componentDidMount = () => {
    if (this.props.home) this.setState({ ...this.props.home.location });
  };
  handleGoogleOutput = place => {
    this.setState(parseAddress(place));
  };
  parseAddressX = googAddyOutput => {
    console.log(googAddyOutput);
    const { formatted_address } = googAddyOutput;
    const [street_number, route, postal_code] = [
      "street_number",
      "route",
      "postal_code"
    ].map(part => {
      try {
        return googAddyOutput.address_components.find(comp =>
          comp.types.find(type => type === part)
        ).short_name;
      } catch (e) {
        return "";
      }
    });
    const address = `${street_number} ${route}`;
    const lat = googAddyOutput.geometry.location.lat();
    const lng = googAddyOutput.geometry.location.lng();
    this.setState({ formatted_address, address, lat, lng, zip: postal_code });
  };
  handleSubmit = () => {
    this.props.home ? this.updateHome() : this.newHome();
    this.props.dispatch(closeModal());
  };
  handleDelete = () => {
    const homeId = this.props.home._id;
    console.log("deleting home", homeId);
    this.props.dispatch(removeHome(homeId));
  };
  newHome = () => {
    console.log("new house!", this.state);
    this.props.dispatch(addHome(this.state));
  };
  updateHome = () => {
    console.log("edit house!", this.state);
    const homeId = this.props.home._id;
    const homeKey = "location";
    const updateObj = this.state;
    this.props.dispatch(editHome({ homeId, homeKey, updateObj }));
  };
  render() {
    return (
      <div>
        <h2>{this.props.home ? "Edit" : "New"} Home Address</h2>
        <Autocomplete
          onPlaceSelected={place => this.handleGoogleOutput(place)}
          types={["address"]}
          style={{ minWidth: "15rem" }}
        />
        <h3>{this.state.formatted_address}</h3>
        <p>lat: {this.state.lat}</p>
        <p>lat: {this.state.lng}</p>
        <button onClick={this.handleSubmit}>GO!</button>
        <button onClick={this.handleDelete}>DELETE</button>
      </div>
    );
  }
}

export default connect()(HomeFormContainer);
