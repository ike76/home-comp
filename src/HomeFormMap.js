import React from "react";

import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";
import Typography from "@material-ui/core/Typography";

const HomeFormMap = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjQv7dfwN6ySKJqBbteqmeLHYDvm8dWWk&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `250px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { lat, lng } = props;
  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat, lng }}>
      {props.isMarkerShown && (
        <Marker position={{ lat, lng }} onClick={props.onToggleOpen}>
          {props.isOpen && (
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <Typography>{props.address}</Typography>
            </InfoWindow>
          )}{" "}
        </Marker>
      )}
    </GoogleMap>
  );
});

export default HomeFormMap;
