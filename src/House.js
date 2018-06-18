import React, { Component } from "react";
import Box from "./Boxes/Box";
import AddressBox from "./AddressBox";
import RoofBackground from "./Images/bwRoof.jpg";
import "./House.css";
import ImageBox from "./Boxes/ImageBox";
import MapBox from "./Boxes/MapBox";
export default class House extends Component {
  render() {
    const { home, attrNames } = this.props;

    return (
      <div className="house">
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
              return (
                <MapBox key={name + i} name={name} home={home} index={i} />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }
}
