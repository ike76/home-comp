import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import DumBox from "./DumBox";
export class Row extends Component {
  render() {
    return (
      <Fragment>
        <p>{this.props.description}</p>
        <DumBox />
        <DumBox />
        <DumBox />
        <DumBox />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  homes: state.main.homes
});

export default connect(mapStateToProps)(Row);
