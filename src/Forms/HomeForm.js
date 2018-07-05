import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { addHome, editHome, removeHome } from "../actions/houseActions";
import { closeModal } from "../actions/uiActions";
import HomeFormMap from "../HomeFormMap";
import { parseAddress } from "../Utilities/parseGoogleAddress";

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
    const { lat, lng } = this.state;
    return (
      <div>
        {this.state.lat && (
          <HomeFormMap
            isMarkerShown
            lat={lat}
            lng={lng}
            address={this.state.address}
          />
        )}
        <Typography variant="subheading" style={{ marginTop: ".5rem" }}>
          {this.props.home ? "Edit" : "New"} Home Address
        </Typography>
        <Autocomplete
          onPlaceSelected={place => this.handleGoogleOutput(place)}
          types={["address"]}
          style={{ minWidth: "15rem" }}
        />
        {this.state.address && (
          <Typography variant="body2" data-test="display-address">
            {this.state.address}
          </Typography>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button
            variant="outlined"
            onClick={this.handleSubmit}
            data-test="submit-button"
            color="primary"
            size="small"
          >
            SAVE
          </Button>
          <Button
            variant="outlined"
            onClick={this.handleDelete}
            data-test="delete-button"
            color="secondary"
            size="small"
          >
            DELETE
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(HomeForm);
