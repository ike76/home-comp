import React from "react";
import { connect } from "react-redux";
import "./Stars.css";

const Star = props => {
  const { filled, changeRating } = props;
  const className = filled ? "fas filled fa-star" : "far fa-star";
  return (
    <div>
      <i className={className} onClick={changeRating} />
    </div>
  );
};

export default connect()(Star);
