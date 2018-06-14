import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeLister from "../HomeLister";
import ControlHouse from "../ControlHouse";
import NewHomeFormContainer from "../Forms/NewHomeFormContainer";
import RegistrationFormContainer from "../Forms/RegistrationFormContainer";
import "./Layout.css";
export default () => {
  return (
    <Router>
      <div className="layout">
        <header className="header">
          <h3>HomeComp</h3>
          <div className="links">
            <Link to="/compare">Compare</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/preferences">Preferences</Link>
            <a href="">ike76@me.com</a>
          </div>
        </header>
        <section className="sidebar">
          <Route path="/compare" component={ControlHouse} />
        </section>
        <main className="main">
          <Route path="/compare" component={HomeLister} />
          <Route path="/signup" component={RegistrationFormContainer} />
        </main>
        <section className="sidebar2">
          <NewHomeFormContainer />
          <NewHomeFormContainer fake />
        </section>
        <footer className="footer">footer</footer>
      </div>
    </Router>
  );
};
