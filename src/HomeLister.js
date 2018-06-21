import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import House from "./House";
import { getMyHomesTHUNK, getMyAttributes } from "./actions/userActions";
import requiresLogin from "./HOC/RequiresLogin";

class HomeLister extends Component {
  getMyStuff = () => {
    this.props.dispatch(getMyAttributes());
    this.props.dispatch(getMyHomesTHUNK(this.props.userId));
  };
  componentDidMount() {
    this.props.user ? this.getMyStuff() : console.log("no user yet");
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user._id !== this.props.user._id) this.getMyHomes();
  }
  render() {
    const { homes, attrNames, customAttrNames } = this.props;
    if (!homes.length) {
      return <i className="fas fa-spinner" />;
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
  // border: "5px solid black",
  overflow: "scroll",
  justifyContent: "safe",
  padding: "1.5rem 5px"
};
const mapStateToProps = state => ({
  attrNames: state.house.attrNames,
  homes: state.house.homes,
  user: state.auth.user
});
export default requiresLogin()(connect(mapStateToProps)(HomeLister));
