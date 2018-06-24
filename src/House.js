import React, { Component } from "react";
import styled from "styled-components";

import Box from "./Boxes/Box";
import AddressBox from "./AddressBox";
import RoofBackground from "./Images/bwRoof.jpg";
import ImageBox from "./Boxes/ImageBox";
import MapBox from "./Boxes/MapBox";
import bricks from "./Images/brick-wall.jpg";
const House = props => {
  const { home, attrNames } = props;

  const BrickHouse = styled.div`
    margin: 10px;
    background: url(${bricks});
    background-size: contain;
    padding: 0 1px 2px;
    box-shadow: 3px 4px 4px 0px #00000040;
  `;
  return (
    <BrickHouse>
      <AddressBox
        addy={home.location.address}
        homeId={home._id}
        home={home}
        roofImage={RoofBackground}
      />

      {attrNames.map((name, i) => {
        switch (name.type) {
          case "number":
          case "price":
            return (
              <Box
                key={name + i}
                name={name}
                home={home}
                slug={name.slug}
                index={i}
              />
            );

          case "image":
            return (
              <ImageBox key={name + i} name={name} home={home} index={i} />
            );
          case "map":
            return <MapBox key={name + i} name={name} home={home} index={i} />;
          default:
            return null;
        }
      })}
    </BrickHouse>
  );
};

export default House;
