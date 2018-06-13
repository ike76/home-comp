import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import "./SortArrows.css";
import Arrow from "./Arrow";
const SortArrows = props => {
  const handleUpClick = () => {
    props.dispatch(actions.sortByCustom(props.name, true));
  };
  const handleDownClick = () => {
    props.dispatch(actions.sortByCustom(props.name, false));
  };
  const enabled =
    props.homes.filter(h => h[props.name]).length === props.homes.length;
  if (!enabled)
    return (
      <div className="sort-icons">
        <i className="far fa-question-circle" />
      </div>
    );
  return (
    <div className="sort-icons">
      <span>
        <Arrow
          type="up"
          selected={
            props.name === props.currentSortAttr && props.currentAscending
          }
          click={handleUpClick}
          disabled={!enabled}
        />
      </span>
      <span>
        <Arrow
          type="down"
          selected={
            props.name === props.currentSortAttr && !props.currentAscending
          }
          click={handleDownClick}
          disabled={!enabled}
        />
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  currentSortAttr: state.house.sortedBy.attr,
  currentAscending: state.house.sortedBy.ascending,
  homes: state.house.homes
});
export default connect(mapStateToProps)(SortArrows);
