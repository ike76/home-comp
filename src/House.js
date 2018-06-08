import React, { Component, Fragment } from "react";
import Box from "./Box";
import AddressBox from "./AddressBox";
import styled from "styled-components";
import RoofBackground from "./Images/bwRoof.jpg";
import "./House.css";

export default class House extends Component {
  render() {
    const { home, attrNames, index } = this.props;
    const colNumber = index + 2;
    return (
      <div className="house">
        <AddressBox
          addy={home.location.address}
          colNumber={colNumber}
          roofImage={RoofBackground}
        />
        {attrNames.map((name, i) => (
          <Box
            key={name + i}
            name={name}
            home={home}
            slug={name.slug}
            colNumber={colNumber}
            rowNumber={i + 2}
          />
        ))}
      </div>
    );
  }
}
