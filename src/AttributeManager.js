import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addAttribute, deleteAttribute } from "./actions/houseActions";
import slugify from "slugify";
import uuid from "uuid";

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
    this.props.dispatch(addAttribute(attrObject));
  };
  deleteAttribute = attr => {
    this.props.dispatch(deleteAttribute(attr));
  };
  render() {
    const { attrNames } = this.props;

    return (
      <Grid>
        <Header>
          <h1>Attribute Manager</h1>
        </Header>
        {attrNames.map(attrName => (
          <Fragment>
            <div>
              <h3>{attrName.pretty}</h3>
            </div>
            <div>
              <button onClick={() => this.deleteAttribute(attrName)}>
                Delete
              </button>
            </div>
          </Fragment>
        ))}
        <div>
          <input
            type="text"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </div>
        <div>
          <ButtonRow>
            {["Price", "Number", "Image"].map(type => (
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
        </div>
      </Grid>
    );
  }
}
const selectedStyle = { background: "grey", color: "white" };
const Grid = styled.div`
  background: beige;
  padding: 5px;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
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
