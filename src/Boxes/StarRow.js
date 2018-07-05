import React from "react";
import styled from "styled-components";
import Star from "./Star";

const StarDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: small;
`;
const StarRow = props => {
  const handleClick = e => {
    e.stopPropagation();
  };
  const { home, name, changeRating } = props;
  const rating = home.attributes[name] && home.attributes[name].value;
  return (
    <StarDiv>
      {[1, 1, 1, 1, 1, 1, 1].map((x, i) => (
        <Star
          key={i}
          filled={i <= rating - 1}
          rating={i + 1}
          homeId={home._id}
          name={name}
          changeRating={e => {
            e.stopPropagation();
            changeRating(i + 1);
          }}
          data-test="star"
        />
      ))}
    </StarDiv>
  );
};

export default StarRow;
