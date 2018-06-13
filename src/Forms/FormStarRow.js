import React, { Component } from "react";

export default class FormStarRow extends Component {
  state = {
    stars: 2
  };
  handleClick = num => {
    console.log("star number", num);
    this.setState({ stars: num });
    this.props.input.onChange(num);
  };
  render() {
    const {
      input: { value, onChange }
    } = this.props;
    return (
      <div>
        {[1, 2, 3, 4, 5, 6, 7].map(num => {
          const filled = num <= this.state.stars;
          return (
            <i
              className={`${filled ? "fas filled" : "far "} fa-star`}
              onClick={() => this.handleClick(num)}
            />
          );
        })}
      </div>
    );
  }
}
