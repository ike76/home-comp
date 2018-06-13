import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import House from "./House";

class HomeLister extends Component {
  render() {
    const { homes, attrNames, customAttrNames } = this.props;
    return (
      <div>
        <FlipMove style={listStyle}>
          {homes.map((home, i) => (
            <House
              home={home}
              attrNames={attrNames}
              customAttrNames={customAttrNames}
              index={i}
              key={home._id}
            />
          ))}
        </FlipMove>
      </div>
    );
  }
}

const listStyle = {
  display: "flex",
  flexDirection: "row",
  border: "5px solid black",
  overflow: "scroll",
  justifyContent: "safe",
  padding: "1.5rem"
};
const mapStateToProps = state => ({
  attrNames: state.house.attrNames,
  customAttrNames: state.house.customAttrNames,
  homes: state.house.homes
});
export default connect(mapStateToProps)(HomeLister);
