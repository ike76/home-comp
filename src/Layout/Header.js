import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <h3>HomeComp</h3>
        <div className="links">
          <h2>
            <Link to="/preferences">Preferences</Link>
          </h2>
          {/* <a href="">Sign In</a> */}
          <a href="">ike76@me.com</a>
        </div>
      </Fragment>
    );
  }
}
