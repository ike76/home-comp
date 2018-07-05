import React, { Fragment } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from "react-google-maps";
import { Value, Attribute } from "../UIElements/StyledText";
import FlexRow from "../UIElements/FlexRow";

const google = window.google;

const MapModal = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjQv7dfwN6ySKJqBbteqmeLHYDvm8dWWk&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `80%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `80%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      if (this.props.directions) return;
      console.log("getting directions from google in MapModal");
      const DirectionsService = new google.maps.DirectionsService();
      const { origLat, origLng, destLat, destLng } = this.props;
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(Number(origLat), Number(origLng)),
          destination: new google.maps.LatLng(destLat, destLng),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions`, result);
          }
        }
      );
    }
  })
)(props => (
  <Fragment>
    <GoogleMap
      defaultZoom={9}
      defaultCenter={new google.maps.LatLng(props.origLat, props.origLng)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
      <FlexRow>
        <div>
          <Attribute>Distance: </Attribute>
          <Value>
            <span data-test="distance-display">
              {props.directions &&
                props.directions.routes[0].legs[0].distance.text}
            </span>
          </Value>
        </div>
        <div>
          <Attribute>Travel Time: </Attribute>
          <Value>
            <span data-test="travel-time-display">
              {props.directions &&
                props.directions.routes[0].legs[0].duration.text}
            </span>
          </Value>
        </div>
      </FlexRow>
    </GoogleMap>
  </Fragment>
));

export default MapModal;
