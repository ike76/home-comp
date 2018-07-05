import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { openModal } from "../actions/uiActions";
import Modal from "../Utilities/Modal";
import MapModal from "./MapModal";
import { editHome } from "../actions/houseActions";
import { Value, Attribute } from "../UIElements/StyledText";
import FlexRow from "../UIElements/FlexRow";
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
      this.updateDirections();
    }
  }
  componentDidUpdate(prevProps) {
    const thisUpdatedHome = this.props.allHomes.find(
      home => home._id === this.props.home._id
    );
    const thisPreviousHome = prevProps.home;
    if (thisUpdatedHome.location.address === thisPreviousHome.location.address)
      console.log("address same");
  }
  updateDirections() {
    console.log("getting directions from google in MapBox");
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
  render() {
    const { name, home, heights } = this.props;
    const StyledBox = styled.div`
      height: ${heights[name.type]};
    `;

    return (
      <Fragment>
        <StyledBox className="box">
          <div>
            <FlexRow>
              <Attribute>dist:</Attribute>
              <Value>
                <span data-test="distance-text">
                  {home.attributes[name.slug] &&
                    home.attributes[name.slug].distanceText}
                </span>
              </Value>
            </FlexRow>
            <FlexRow>
              <Attribute>time:</Attribute>
              <Value>
                <span data-test="travel-time-text">
                  {home.attributes[name.slug] &&
                    home.attributes[name.slug].durationText}
                </span>
              </Value>
            </FlexRow>
            <button onClick={this.openMap} data-test="open-modal-button">
              Map
            </button>
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
  modalOpen: state.ui.modalOpen,
  allHomes: state.house.homes
});

export default connect(mapStateToProps)(MapBox);
