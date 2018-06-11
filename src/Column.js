import React, { Component, Fragment } from "react";
import Box from "./Boxes/Box";
import AddressBox from "./AddressBox";
import styled from "styled-components";
import RoofBackground from "./Images/bwRoof.jpg";

export default class Column extends Component {
  render() {
    const { home, attrNames, index } = this.props;
    const colNumber = index + 2;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
