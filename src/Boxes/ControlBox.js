import React from "react";
import styled from "styled-components";
import "./Box.css";

const ControlBox = props => {
  const { sortedBy, attr, click, height, editAttribute } = props;
  const StyledBox = styled.div`
    height: ${height};
  `;
  const selected = attr.slug === sortedBy.attr;
  const direction = sortedBy.ascending ? "up" : "down";
  const icon = selected ? (
    <i className={`fas selected fa-arrow-circle-${direction}`} />
  ) : (
    //
    <i className="unselected fas fa-sort" />
  );
  return (
    <StyledBox className="controlBox">
      <span className={selected ? "selected" : "unselected"}>
        {`${attr.pretty}:`}
      </span>
      {
        <div onClick={click} className="controlButton">
          {icon}
        </div>
      }
    </StyledBox>
  );
};

export default ControlBox;
