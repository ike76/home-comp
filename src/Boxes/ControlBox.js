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
    <i className={`fas selected fa-arrow-circle-${direction}`} />
  ) : (
    //
    <i className="unselected fas fa-sort" />
  );
  return (
    <StyledBox className="controlBox">
      <NameSpan className={selected ? "selected" : "unselected"}>
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
