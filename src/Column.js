import React, { Component, Fragment } from "react";
import Box from "./Box";
import AddressBox from "./AddressBox";

export default class Column extends Component {
  render() {
    const { home, attrNames } = this.props;
    return (
      <Fragment>
        <AddressBox addy={home.location.address} />
        {attrNames.map((name, i) => (
          <Box key={name + i} name={name} home={home} slug={name.slug} />
        ))}
      </Fragment>
    );
  }
}
