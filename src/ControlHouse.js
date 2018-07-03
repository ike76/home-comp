import React from "react";
import { connect } from "react-redux";
import ControlBox from "./Boxes/ControlBox";
import { sortHomes } from "./actions/houseActions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const ControlHouse = props => {
  const { attrNames, sortedBy, heights, dispatch } = props;

  const handleClick = attr => {
    const ascending = sortedBy.attr === attr.slug ? !sortedBy.ascending : true;
    dispatch(sortHomes(attr.slug, ascending));
  };

  return (
    <div className="sidebar">
      <div style={{ height: heights.roof }}>
        <Link to="/attributes">
          <Button variant="contained" color="primary" size="small">
            Edit Attributes
          </Button>
        </Link>
      </div>
      <div>
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
