import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import House from "./House";
import { getMyHomesTHUNK } from "./actions/userActions";
class HomeLister extends Component {
  componentDidMount() {
    this.props.dispatch(getMyHomesTHUNK(this.props.userId));
  }
  render() {
    const { homes, attrNames, customAttrNames } = this.props;
    if (!homes.length) {
      return <h2>LOADING</h2>;
    }
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
  homes: state.house.homes,
  userId: state.user.userId
});
export default connect(mapStateToProps)(HomeLister);
