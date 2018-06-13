import React, { Component } from "react";

export default class FormStarRow extends Component {
  handleClick = num => {
    console.log("star number", num);
    this.props.input.onChange(num);
  };
  render() {
    const {
      input: { value, onChange }
    } = this.props;
    return (
      <div>
        {[1, 2, 3, 4, 5, 6, 7].map(num => {
          const filled = num <= this.props.input.value;
          return (
            <i
              key={num}
              className={`${filled ? "fas filled" : "far "} fa-star`}
              onClick={() => this.handleClick(num)}
            />
          );
        })}
      </div>
    );
  }
}
