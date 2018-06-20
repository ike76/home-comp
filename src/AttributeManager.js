import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addAttribute, deleteAttribute } from "./actions/houseActions";
import AttributeFormContainer from "./Forms/AttributeFormContainer";
import slugify from "slugify";
import uuid from "uuid";
import Button from "./UIElements/Button";

export class AttributeManager extends Component {
  state = {
    type: "Price",
    value: ""
  };
  addAttribute = () => {
    const pretty = this.state.value;
    const attrType = this.state.type.toLowerCase();
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const id = uuid();
    const attrObject = { pretty, slug, type: attrType, id };
    this.props.dispatch(addAttribute([attrObject]));
  };
  deleteAttribute = attr => {
    this.props.dispatch(deleteAttribute(attr.id));
  };
  render() {
    const { attrNames } = this.props;

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
                  <Button
                    text="Delete"
                    click={() => this.deleteAttribute(attrName)}
                  />
                  {/* <button onClick={}>
                    Delete
                  </button> */}
                </div>
              </Fragment>
            ))}
          </AttributeListGrid>
        </InlineDiv>
        <InlineDiv>
          <AttributeFormContainer />
        </InlineDiv>
        {/* <InlineDiv>
          <div>
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </div>
          <ButtonRow>
            {["Price", "Number", "Image", "Distance"].map(type => (
              <button
                onClick={() => this.setState({ type })}
                style={this.state.type === type ? selectedStyle : null}
                key={type}
              >
                {type}
              </button>
            ))}
          </ButtonRow>
          <button onClick={this.addAttribute}>Add</button>
        </InlineDiv> */}
      </AttributeManagerGrid>
    );
  }
}
const AttributeListGrid = styled.div`
  background: beige;
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
const ButtonRow = styled.div`
  display: flex;
  justify-items: center;
`;

const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
export default connect(mapStateToProps)(AttributeManager);
