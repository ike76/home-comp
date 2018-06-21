import React, { Component } from "react";
import Layout from "./Layout/Layout";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

export default App;
