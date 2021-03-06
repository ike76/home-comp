import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { withStyles } from "@material-ui/core/styles";
import "./Box.css";

export const ControlBox = props => {
  const { sortedBy, attr, click, height } = props;
  const StyledBox = styled.div`
    height: ${height};
  `;

  const Icon = styled.i`
    position: absolute;
    right: -20px;
    font-size: 1.5rem;
  `;
  const selected = attr.slug === sortedBy.attr;
  const direction = sortedBy.ascending ? "up" : "down";
  const icon = selected ? (
    <Icon
      className={`selected fas fa-arrow-circle-${direction}`}
      data-test="sort-arrow"
    />
  ) : (
    <Icon className="unselected fas fa-circle" data-test="sort-arrow" />
  );
  const { classes } = props;
  return (
    <StyledBox className="controlBox" data-test="display-button">
      <Tooltip
        id={`tooltip-attr.slug`}
        title={`sort by ${attr.pretty}`}
        placement="right"
      >
        <Button
          variant="outlined"
          color={selected ? "primary" : "default"}
          size="small"
          className={classes.button}
          onClick={click}
        >
          {attr.pretty}
        </Button>
      </Tooltip>
      {icon}
      {/* <NameSpan
        data-test="name-display"
        className={selected ? "selected" : "unselected"}
        >
        {`${attr.pretty}:`}
        </NameSpan>
        {
          <div onClick={click} className="controlButton">
          {icon}
          </div>
        } */}
    </StyledBox>
  );
};

const styles = theme => ({
  button: {
    margin: "2px",
    display: "flex",
    justifyContent: "flex-end",
    padding: "3px"
  },
  selected: {
    backgroundColor: "rgba(63, 81, 181, 0.08)"
  }
});
export default withStyles(styles)(ControlBox);
