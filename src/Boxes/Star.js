import React from "react";
import { connect } from "react-redux";
import "./Stars.css";
import { changeHomeValue } from "../actions/actions";

const Star = props => {
  const { filled, homeId, rating, name, changeRating } = props;
  // const handleClick = () => {
  //   props.dispatch(changeHomeValue(homeId, name, rating));
  // };
  return (
    <div>
      <i
        className={`${filled ? "fas filled" : "far "} fa-star`}
        onClick={changeRating}
      />
    </div>
  );
};

export default connect()(Star);
