import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteAttribute } from "./actions/houseActions";
import AttributeFormContainer from "./Forms/AttributeFormContainer";

import Button from "./UIElements/Button";

export const AttributeManager = props => {
  const { attrNames, dispatch } = props;

  const handleDelete = attr => {
    dispatch(deleteAttribute(attr.id));
  };

  return (
    <AttributeManagerGrid>
      <InlineDiv>
        <AttributeListGrid>
          <Header>
            <h1>Attribute Manager</h1>
          </Header>
          {attrNames.map(attrName => (
            <Fragment key={attrName.pretty}>
              <div>
                <h3 style={{ margin: "10px" }}>{attrName.pretty}</h3>
              </div>
              <div>
                <Button text="Delete" click={() => handleDelete(attrName)} />
              </div>
            </Fragment>
          ))}
        </AttributeListGrid>
      </InlineDiv>
      <InlineDiv>
        <AttributeFormContainer />
      </InlineDiv>
    </AttributeManagerGrid>
  );
};
const AttributeListGrid = styled.div`
  background: #ffffff94;
  padding: 1rem;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
`;
const AttributeManagerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 19rem));
`;
const InlineDiv = styled.div`
  display: inline-block;
`;
const Header = styled.div`
  grid-column: 1 / -1;
`;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
export default connect(mapStateToProps)(AttributeManager);
