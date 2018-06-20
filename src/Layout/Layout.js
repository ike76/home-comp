import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomeLister from "../HomeLister";
import ControlHouse from "../ControlHouse";
import RegistrationFormContainer from "../Forms/RegistrationFormContainer";
import SignInFormContainer from "../Forms/SignInFormContainer";
import AttributeManager from "../AttributeManager";
import AddNewHouseButton from "../AddNewHouseButton";
import { logOut } from "../actions/authActions";
import "./Layout.css";
class Layout extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="layout">
          <header className="header">
            <h3>HomeComp</h3>
            <div className="links">
              {this.props.user ? (
                <Fragment>
                  <Link to="/compare">Compare</Link>
                  <span href="">{this.props.user.email}</span>
                  <Link
                    to="/signout"
                    onClick={() => this.props.dispatch(logOut())}
                  >
                    Sign Out
                  </Link>
                  <Link to="/preferences">Preferences</Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/signin">Sign In</Link>
                </Fragment>
              )}
            </div>
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
          <footer className="footer">footer</footer>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Layout);
