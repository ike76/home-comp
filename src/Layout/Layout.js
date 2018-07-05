import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeLister from "../HomeLister";
import RegistrationFormContainer from "../Forms/RegistrationFormContainer";
import SignInFormContainer from "../Forms/SignInFormContainer";
import AttributeManager from "../AttributeManager";
import { logOut } from "../actions/authActions";
import "./Layout.css";
import HeaderMUI from "./HeaderMUI";
import HomePage from "../HomePage";
import gitHubCircle from "../Images/github-circle.png";
import cobblestones from "../Images/cobblestones.jpg";
import grass from "../Images/grass.png";
const FooterSection = styled.section`
  background: url(${cobblestones}) repeat;
  background-size: 160px;
`;
const GrassDiv = styled.div`
  position: absolute;
  top: -1.8rem;
  left: 0;
  width: 100%;
  height: 2rem;
  background: url(${grass});
  background-size: 15rem;
`;

class Layout extends Component {
  logout = () => {
    this.props.dispatch(logOut());
  };
  render() {
    const { user } = this.props;
    const isLoggedIn = component => {
      return user ? component : SignInFormContainer;
    };
    return (
      <Router>
        <div className="layout">
          <header className="header">
            <HeaderMUI user={user} logOut={this.logout} />
          </header>

          <main className="main">
            <Switch>
              <Route path="/compare" component={isLoggedIn(HomeLister)} />
              <Route
                path="/attributes"
                component={isLoggedIn(AttributeManager)}
              />
              <Route path="/signup" component={RegistrationFormContainer} />
              <Route exact path="/signin" component={SignInFormContainer} />
              <Route exact path="/" component={HomePage} />
              <Route component={() => <div>no match</div>} />
            </Switch>
          </main>

          <FooterSection className="footer">
            <GrassDiv />
            <a
              href="https://github.com/ike76/home-comp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="30px"
                height="30px"
                src={gitHubCircle}
                alt="git hub repo"
              />
            </a>
          </FooterSection>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Layout);
