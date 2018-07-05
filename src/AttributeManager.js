import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteAttribute, moveAttribute } from "./actions/houseActions";
import AttributeForm2 from "./Forms/AttributeForm2";
import FlipMove from "react-flip-move";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
export const AttributeManager = props => {
  const { attrNames, dispatch } = props;

  const handleDelete = attr => {
    dispatch(deleteAttribute(attr.id));
  };
  const handleClick = (i, delta) => {
    console.log(i, delta);
    dispatch(moveAttribute(i, delta));
  };

  return (
    <div>
      <Header>
        <Typography variant="display1" gutterBottom>
          Attribute Manager
        </Typography>
        <Link to="/compare" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" size="small">
            <i class="material-icons">arrow_back</i> Back To List
          </Button>
        </Link>
      </Header>
      <AttributeManagerGrid>
        <AttributeListGrid>
          <FlipMove>
            {attrNames.map((attrName, i) => (
              <Row key={attrName.pretty}>
                <div>
                  <Typography variant="button">{attrName.pretty}</Typography>
                </div>
                <IconButton size="small" onClick={() => handleClick(i, -1)}>
                  <ArrowUpward />
                </IconButton>
                <IconButton size="small" onClick={() => handleClick(i, 1)}>
                  <ArrowDownward />
                </IconButton>
                <div>
                  <IconButton
                    variant="outlined"
                    aria-label="Delete"
                    color="secondary"
                    onClick={() => handleDelete(attrName)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Row>
            ))}
          </FlipMove>
        </AttributeListGrid>
        <AttributeForm2 />
      </AttributeManagerGrid>
    </div>
  );
};
const AttributeListGrid = styled.div`
  background: #ffffff94;
  padding: 1rem;
  display: grid;
  // grid-template-columns: repeat(4, max-content);
  // grid-gap: 5px;
  justify-items: center;
  align-items: center;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  justify-content: end;
  grid-gap: 6px;
  align-items: center;
`;
const AttributeManagerGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  // display: grid;
  // grid-template-columns: 1fr max-content max-content 1fr;
  // grid-gap: 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin: 1rem;
`;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
export default connect(mapStateToProps)(AttributeManager);
