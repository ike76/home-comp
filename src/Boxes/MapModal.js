import React, { Component, Fragment } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from "react-google-maps";
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
      // if (this.props.directions) return;
      console.log("getting directions from google");
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
            console.log("this is", this);
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const prevPolyline =
        prevProps.directions &&
        prevProps.directions.routes[0].overview_polyline;
      const nowPolyLine = this.props.directions.routes[0].overview_polyline;
      if (prevPolyline !== nowPolyLine) {
        this.props.saveDirections(this.props.directions);
      }
    }
  })
)(props => (
  <Fragment>
    <GoogleMap
      defaultZoom={9}
      defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
      <p>
        <strong>Distance: </strong>
        {props.directions && props.directions.routes[0].legs[0].distance.text}
      </p>
      <p>
        <strong>Travel Time: </strong>
        {props.directions && props.directions.routes[0].legs[0].duration.text}
      </p>
    </GoogleMap>
  </Fragment>
));

export default MapModal;
