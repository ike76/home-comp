import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import ControlHouse from "./ControlHouse";
import House from "./House";

class HomeLister extends Component {
  render() {
    const { homes, attrNames } = this.props;
    return (
      <div>
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
  border: "5px solid black",
  overflow: "scroll",
  justifyContent: "safe",
  padding: "1.5rem"
};
const mapStateToProps = state => ({
  attrNames: state.main.attrNames,
  homes: state.main.homes
});
export default connect(mapStateToProps)(HomeLister);
