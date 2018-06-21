import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import HomeLister from "../HomeLister";
import ControlHouse from "../ControlHouse";
import RegistrationFormContainer from "../Forms/RegistrationFormContainer";
import SignInFormContainer from "../Forms/SignInFormContainer";
import AttributeManager from "../AttributeManager";
import AddNewHouseButton from "../AddNewHouseButton";
import { logOut } from "../actions/authActions";
import "./Layout.css";

const StyleLinks = styled.div`
  font-size: small;
`;
const Dot = styled.span`
  color: #ffffff75;
`;

class Layout extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="layout">
          <header className="header">
            <h3>HomeComp</h3>
            <StyleLinks className="links">
              {this.props.user ? ( // signed in links
                <Fragment>
                  <Link to="/compare">Compare</Link>
                  <Dot>｜</Dot>
                  <span href="">{this.props.user.email}</span>
                  <Dot>｜</Dot>
                  <Link
                    to="/signout"
                    onClick={() => this.props.dispatch(logOut())}
                  >
                    Sign Out
                  </Link>
                </Fragment>
              ) : (
                // signed out links
                <Fragment>
                  <Link to="/signup">Sign Up</Link>
                  <Dot>｜</Dot>
                  <Link to="/signin">Sign In</Link>
                </Fragment>
              )}
            </StyleLinks>
          </header>
          <section className="sidebar">
            <Route path="/compare" component={ControlHouse} />
          </section>
          <main className="main">
            <Switch>
              <Route path="/compare" component={HomeLister} />
              <Route path="/attributes" component={AttributeManager} />
              <Route path="/signup" component={RegistrationFormContainer} />
              <Route path="/" component={SignInFormContainer} />
            </Switch>
          </main>
          <section className="sidebar2">
            <AddNewHouseButton />
          </section>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Layout);
