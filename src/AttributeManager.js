import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteAttribute, moveAttribute } from "./actions/houseActions";
import AttributeForm from "./Forms/AttributeForm";
import FlipMove from "react-flip-move";

import Button from "./UIElements/Button";

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
    <AttributeManagerGrid>
      <InlineDiv>
        <AttributeListGrid>
          <Header>
            <h1>Attribute Manager</h1>
          </Header>
          <FlipMove>
            {attrNames.map((attrName, i) => (
              <Row key={attrName.pretty}>
                <div>
                  <h3 style={{ margin: "10px" }}>{attrName.pretty}</h3>
                </div>
                <i
                  className="far fa-arrow-alt-circle-up"
                  onClick={() => handleClick(i, -1)}
                />
                <i
                  className="far fa-arrow-alt-circle-down"
                  onClick={() => handleClick(i, 1)}
                />
                <div>
                  <Button text="Delete" click={() => handleDelete(attrName)} />
                </div>
              </Row>
            ))}
          </FlipMove>
        </AttributeListGrid>
      </InlineDiv>
      <InlineDiv>
        <AttributeForm />
      </InlineDiv>
    </AttributeManagerGrid>
  );
};
const AttributeListGrid = styled.div`
  background: #ffffff94;
  padding: 1rem;
  display: grid;
  // grid-template-columns: repeat(4, max-content);
  grid-gap: 5px;
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
