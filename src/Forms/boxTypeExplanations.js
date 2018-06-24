import React from "react";
import styled from "styled-components";

const Heading = styled.h3`
  margin: 4px 0;
`;
const P = styled.p`
  font-size: 12px;
  color: #585858;
  margin: 0;
`;

const P2 = styled.p`
  font-size: 11px;
  color: #9e9e9e;
  margin: 0;
`;

export const explanation = attrType => {
  switch (attrType) {
    case "price":
      return (
        <div>
          <Heading>Price</Heading>
          <P>Sort by any Price.</P>
          <P2> List Price, Monthly Payment, H.O.A. etc. </P2>
        </div>
      );
    case "number":
      return (
        <div>
          <Heading>Number</Heading>
          <P>Sort by Number</P>
          <P2>Number of Bedrooms, Number of Bathrooms, Square Feet, etc. </P2>
        </div>
      );
    case "image":
      return (
        <div>
          <Heading>Image / Rating</Heading>
          <P>Upload an Image and rate by your own opinion.</P>
          <P2>
            For Attributes that don't have a number. Give your favorite
            'Kitchens' more stars. No Back Yard? Give it 1 star.
          </P2>
        </div>
      );
    case "map":
      return (
        <div>
          <Heading>Distance:</Heading>
          <P>Sort houses by their distance (driving) from any address.</P>
          <P2>'To Work', 'To Gym', etc.</P2>
        </div>
      );
    default:
      return null;
  }
};
