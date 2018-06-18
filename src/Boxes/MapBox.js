import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { openModal } from "../actions/uiActions";
import Modal from "../Utilities/Modal";
import MapModal from "./MapModal";
import { editHomeTHUNK } from "../actions/houseActions";
import { Value, Attribute } from "../UIElements/StyledText";
const google = window.google;
export class MapBox extends Component {
  openMap = () => {
    this.props.dispatch(openModal(`map ${this.props.home._id}`));
  };
  saveDirections = directions => {
    const directionPath = directions.routes["0"].legs["0"];
    const distanceText = directionPath.distance.text;
    const durationText = directionPath.duration.text;
    const distanceNum = directionPath.distance.value;
    const durationNum = directionPath.duration.value;
    const value = durationNum;
    const newStuff = {
      directions,
      distanceText,
      durationText,
      distanceNum,
      durationNum,
      value
    };
    this.props.dispatch(
      editHomeTHUNK({
        homeId: this.props.home._id,
        homeKey: "attributes",
        updateObj: { [this.props.name.slug]: { ...newStuff } }
      })
    );
  };
  componentDidUpdate(prevProps) {}
  render() {
    const { name, home, index, dispatch, heights } = this.props;
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
