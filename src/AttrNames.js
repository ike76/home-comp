import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SortArrows from "./arrows/SortArrows";
export class AttrNames extends Component {
  render() {
    return (
      <Fragment>
        <div>Attributes</div>
        {this.props.attrNames.map((name, i) => (
          <AttrName key={name + i}>
            {name.pretty}
            <SortArrows name={name.slug} />
          </AttrName>
        ))}
      </Fragment>
    );
  }
}

const AttrName = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  justify-self: end;
  cursor: pointer;
`;

const mapStateToProps = state => ({
  attrNames: state.main.attrNames,
  sortedBy: state.main.sortedBy
});

export default connect(mapStateToProps)(AttrNames);
