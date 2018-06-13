import React, { Component, Fragment } from "react";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <h3>HomeComp</h3>
        <div className="links">
          <a href="">Preferences</a>
          {/* <a href="">Sign In</a> */}
          <a href="">ike76@me.com</a>
        </div>
      </Fragment>
    );
  }
}
