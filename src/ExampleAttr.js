import React, { Component } from "react";
import FlipMove from "react-flip-move";
import Button from "@material-ui/core/Button";
import Box from "./Boxes/Box";
import ControlBox from "./Boxes/ControlBox";

const listStyle = {
  display: "flex",
  flexDirection: "row",
  overflow: "scroll",
  justifyContent: "safe",
  padding: ".5rem 5px 0"
};

class ExampleAttr extends Component {
  state = {
    sortedBy: { attr: "price", ascending: true }
  };
  handleClick = () => {
    this.setState({
      sortedBy: {
        attr: this.state.sortedBy.attr,
        ascending: !this.state.sortedBy.ascending
      }
    });
  };
  componentDidMount = () => {
    this.setState({
      sortedBy: {
        attr: this.props.attr,
        ascending: true
      }
    });
  };
  sort = () => {};
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "top" }}>
        <div style={{ marginRight: "1rem" }}>
          <ControlBox
            sortedBy={this.state.sortedBy}
            attr={{ slug: "price", pretty: "Price" }}
            click={this.handleClick}
            height="2rem"
          />
        </div>
        <FlipMove style={listStyle}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </FlipMove>
      </div>
    );
  }
}

export default ExampleAttr;
