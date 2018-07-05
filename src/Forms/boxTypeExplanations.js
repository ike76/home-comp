import React from "react";
import Typography from "@material-ui/core/Typography";

export const explanation = attrType => {
  switch (attrType) {
    case "price":
      return (
        <div>
          <Typography variant="headline">Price</Typography>
          <Typography variant="subheading">Sort by any Price.</Typography>
          <Typography variant="body1">
            List Price, Monthly Payment, H.O.A. etc.{" "}
          </Typography>
        </div>
      );
    case "number":
      return (
        <div>
          <Typography variant="headline">Number</Typography>
          <Typography variant="subheading">Sort by Number</Typography>
          <Typography variant="body1">
            Number of Bedrooms, Number of Bathrooms, Square Feet, etc.{" "}
          </Typography>
        </div>
      );
    case "image":
      return (
        <div>
          <Typography variant="headline">Image / Rating</Typography>
          <Typography variant="subheading">Sort by your own rating</Typography>
          <Typography variant="body1">
            For Attributes that don't have a number.<br /> Give your favorite
            'Kitchens' more stars.<br /> No Back Yard? Give it 1 star.
          </Typography>
        </div>
      );
    case "map":
      return (
        <div>
          <Typography variant="headline">Distance:</Typography>
          <Typography variant="subheading">Sort by driving time</Typography>
          <Typography variant="body1">'To Work', 'To Gym', etc.</Typography>
        </div>
      );
    default:
      return null;
  }
};
