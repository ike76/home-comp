import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import { parseAddress } from "../Utilities/parseGoogleAddress";

import { addHome, editHome, removeHome } from "../actions/houseActions";
import { connect } from "react-redux";
import { closeModal } from "../actions/uiActions";

export class HomeForm extends Component {
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
    this.props.dispatch(addHome(this.state));
  };
  updateHome = () => {
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
        {this.state.formatted_address && (
          <h3 data-test="display-address">{this.state.formatted_address}</h3>
        )}
        <button onClick={this.handleSubmit} data-test="submit-button">
          SAVE
        </button>
        <button onClick={this.handleDelete} data-test="delete-button">
          DELETE
        </button>
      </div>
    );
  }
}

export default connect()(HomeForm);
