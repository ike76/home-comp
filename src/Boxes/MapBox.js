import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import { openModal } from "../actions/uiActions";
import Modal from "../Utilities/Modal";
import MapModal from "./MapModal";
import { editHomeTHUNK } from "../actions/houseActions";
const google = window.google;
export class MapBox extends Component {
  openMap = () => {
    this.props.dispatch(openModal(`map ${this.props.home._id}`));
  };
  saveDirections = directions => {
    this.props.dispatch(
      editHomeTHUNK({
        homeId: this.props.home._id,
        homeKey: "attributes",
        updateObj: { directions }
      })
    );
  };

  render() {
    const { name, home, index, dispatch } = this.props;
    return (
      <Fragment>
        <div>
          <button onClick={this.openMap}>open Map</button>
        </div>
        {this.props.modalOpen === `map ${home._id}` && (
          <Modal>
            <MapModal
              origLat={home.location.lat}
              origLng={home.location.lng}
              destLat={name.lat}
              destLng={name.lng}
              directions={home.attributes.directions}
              saveDirections={this.saveDirections}
            />
            <p>orig lat: {home.location.lat}</p>
            <p>orig lng: {home.location.lng}</p>
            <p>dest lat: {name.lat}</p>
            <p>dest lng:{name.lng}</p>
            <h1>yo</h1>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // state.house.attrNames
  modalOpen: state.ui.modalOpen
});

export default connect(mapStateToProps)(MapBox);
