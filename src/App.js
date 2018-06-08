import React, { Component } from "react";
import HomeGrid from "./HomeGrid";
import HomeLister from "./HomeLister";
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeGrid />
        <HomeLister />
      </div>
    );
  }
}

export default App;
