import React from "react";
import { connect } from "react-redux";
import "./Stars.css";

const Star = props => {
  const { filled, changeRating } = props;

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
