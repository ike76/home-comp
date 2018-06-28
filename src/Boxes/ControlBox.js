import React from "react";
import styled from "styled-components";
import "./Box.css";

const ControlBox = props => {
  const { sortedBy, attr, click, height } = props;
  const StyledBox = styled.div`
    height: ${height};
  `;
  const NameSpan = styled.span`
    font-size: 10px;
    max-width: 4rem;
  `;
  const selected = attr.slug === sortedBy.attr;
  const direction = sortedBy.ascending ? "up" : "down";
  const icon = selected ? (
    <i
      className={`selected fas fa-arrow-circle-${direction}`}
      data-test="sort-arrow"
    />
  ) : (
    <i className="unselected fas fa-sort" data-test="sort-arrow" />
  );
  return (
    <StyledBox className="controlBox">
      <NameSpan
        data-test="name-display"
        className={selected ? "selected" : "unselected"}
      >
        {`${attr.pretty}:`}
      </NameSpan>
      {
        <div onClick={click} className="controlButton">
          {icon}
        </div>
      }
    </StyledBox>
  );
};

export default ControlBox;
