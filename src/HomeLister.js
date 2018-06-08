import React, { Component } from "react";
import FlipMove from "react-flip-move";
import styled from "styled-components";
import { connect } from "react-redux";

import House from "./House";

class HomeLister extends Component {
  state = {
    things: ["thing1", "thing2", "thing3", "thing4", "thing5"]
  };
  sortThings = () => {
    const newOrder = this.state.things.sort((a, b) => Math.random() - 0.5);
    this.setState({ things: newOrder });
  };
  render() {
    const { homes, attrNames } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <p>Address</p>
          <p>Address</p>
          <p>Address</p>
          <p>Address</p>
        </div>
        <FlipMove style={listStyle}>
          {homes.map((home, i) => (
            <House home={home} attrNames={attrNames} index={i} key={home.id} />
          ))}
        </FlipMove>
      </div>
    );
  }
}

const listStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  border: "1px solid green"
};
const mapStateToProps = state => ({
  attrNames: state.main.attrNames,
  homes: state.main.homes
});
export default connect(mapStateToProps)(HomeLister);
