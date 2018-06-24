import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { openModal } from "../actions/uiActions";
import Modal from "../Utilities/Modal";
import MapModal from "./MapModal";
import { editHome } from "../actions/houseActions";
import { Value, Attribute } from "../UIElements/StyledText";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
const google = window.google;

export class MapBox extends Component {
  openMap = () => {
    this.props.dispatch(openModal(`map ${this.props.home._id}`));
  };
  handleSaveDirections = directions => {
    console.log(directions);
    const turns = directions.routes[0].overview_path.length;
    if (turns < 100) {
      this.saveDirections(directions, "all");
    } else {
      this.saveDirections(directions, "basic");
    }
  };
  saveDirections = (directions, depth) => {
    const directionPath = directions.routes["0"].legs["0"];
    const distanceText = directionPath.distance.text;
    const durationText = directionPath.duration.text;
    const distanceNum = directionPath.distance.value;
    const durationNum = directionPath.duration.value;
    const value = durationNum;
    const newStuff = {
      directions: depth === "all" ? directions : null,
      distanceText,
      durationText,
      distanceNum,
      durationNum,
      value
    };
    this.props.dispatch(
      editHome({
        homeId: this.props.home._id,
        homeKey: "attributes",
        updateObj: { [this.props.name.slug]: { ...newStuff } }
      })
    );
  };
  componentDidMount() {
    const { home, name } = this.props;
    if (
      !(home.attributes[name.slug] && home.attributes[name.slug].distanceNum)
    ) {
      console.log("getting directions from google");
      const DirectionsService = new google.maps.DirectionsService();
      const origLat = this.props.home.location.lat;
      const origLng = this.props.home.location.lng;
      const destLat = this.props.name.lat;
      const destLng = this.props.name.lng;

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(Number(origLat), Number(origLng)),
          destination: new google.maps.LatLng(destLat, destLng),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.handleSaveDirections(result);
          } else {
            console.error(`error fetching directions`, result);
          }
        }
      );
    }
  }
  render() {
    const { name, home, heights } = this.props;
    const StyledBox = styled.div`
      height: ${heights[name.type]};
    `;
    const FlexRow = styled.div`
      display: flex;
      justify-content: space-between;
    `;

    return (
      <Fragment>
        <StyledBox className="box">
          <div>
            <FlexRow>
              <Attribute>dist:</Attribute>
              <Value>
                {home.attributes[name.slug] &&
                  home.attributes[name.slug].distanceText}
              </Value>
            </FlexRow>
            <FlexRow>
              <Attribute>time:</Attribute>
              <Value>
                {home.attributes[name.slug] &&
                  home.attributes[name.slug].durationText}
              </Value>
            </FlexRow>
            <button onClick={this.openMap}>Map</button>
          </div>
        </StyledBox>
        {this.props.modalOpen === `map ${home._id}` && (
          <Modal>
            <MapModal
              origLat={home.location.lat}
              origLng={home.location.lng}
              destLat={name.lat}
              destLng={name.lng}
              directions={
                home.attributes[name.slug] &&
                home.attributes[name.slug].directions
              }
              saveDirections={this.saveDirections}
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

export default connect(mapStateToProps)(MapBox);
