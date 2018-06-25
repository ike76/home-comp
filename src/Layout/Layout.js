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
import BackgroundImage from "../Images/paper.png";
import BackgroundGrass from "../Images/sky-and-grass-background-4.jpg";

const StyleLinks = styled.div`
  font-size: small;
`;
const Dot = styled.span`
  color: #ffffff75;
`;
const Background = styled.div`
  background-image: url(${BackgroundImage});
  width: "100vw";
  height: "100vh";
  position: "fixed";
  top: 0;
  left: 0;
  z-index: -10;
  opacity: 0.7;
`;
const BGGrassDiv = styled.div`
  background: blue;
  background-image: url(${BackgroundGrass});
  height: 100vh;
  position: absolute;
  bottom: 0;
  z-index: -2;
  width: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  opacity: 0.5;
`;

class Layout extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="layout">
          <header className="header">
            <Link to="/">
              <h3>HomeComp</h3>
            </Link>
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
            <Background />
          </main>

          <section className="footer">
            <BGGrassDiv />
            <h2>footer</h2>
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
