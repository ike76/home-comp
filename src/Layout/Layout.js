import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeLister from "../HomeLister";
import RegistrationFormContainer from "../Forms/RegistrationFormContainer";
import SignInFormContainer from "../Forms/SignInFormContainer";
import AttributeManager from "../AttributeManager";
import { logOut } from "../actions/authActions";
import "./Layout.css";
import HeaderMUI from "./HeaderMUI";
import HomePage from "../HomePage";

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

          <section className="footer" />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Layout);
