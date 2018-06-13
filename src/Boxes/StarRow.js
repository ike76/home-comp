import React, { Component } from "react";
import styled from "styled-components";
import Star from "./Star";
export default class StarRow extends Component {
  state = {
    rating: 5
  };
  render() {
    const { home, name } = this.props;
    const rating = home.attributes[name].value;
    return (
      <StarDiv>
        {[1, 1, 1, 1, 1, 1, 1].map((x, i) => (
          <Star
            key={i}
            filled={i <= rating - 1}
            rating={i + 1}
            homeId={home._id}
            name={name}
          />
        ))}
      </StarDiv>
    );
  }
}

const StarDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: small;
`;
