import React, { Component } from "react";
import { connect } from "react-redux";
import ControlBox from "./Boxes/ControlBox";
import AddressBox from "./AddressBox";
import { sortHomes } from "./actions/houseActions";
import { Link } from "react-router-dom";
import Button from "./UIElements/Button";

const ControlHouse = props => {
  const { attrNames, sortedBy, heights, dispatch } = props;

  const handleClick = attr => {
    const ascending = sortedBy.attr === attr.slug ? !sortedBy.ascending : true;
    dispatch(sortHomes(attr.slug, ascending));
  };

  return (
    <div style={{ padding: "1.1rem 0 0", textAlign: "center" }}>
      <div style={{ height: heights.roof }}>
        <Link to="/attributes">
          <Button text="EDIT Attributes" />
        </Link>
      </div>
      {attrNames.map((attr, i) => {
        return (
          <ControlBox
            key={attr + i}
            attr={attr}
            click={() => handleClick(attr)}
            sortedBy={sortedBy}
            height={heights[attr.type]}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  sortedBy: state.house.sortedBy,
  attrNames: state.house.attrNames,
  heights: state.house.heights,
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(ControlHouse);
