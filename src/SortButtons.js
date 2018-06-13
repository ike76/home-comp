import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { sortByCustom } from "./actions/actions";
class SortButtons extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { attrNames, sortedBy, dispatch } = this.props;
    return attrNames.map((attr, i) => {
      const attrSelected = sortedBy.attr === attr.slug;
      const ascButtonSelected = attrSelected && sortedBy.ascending;
      const descButtonSelected = attrSelected && !sortedBy.ascending;
      const handleSortAsc = () => {
        dispatch(sortByCustom(attr.slug, true));
      };
      const handleSortDesc = () => {
        dispatch(sortByCustom(attr.slug, false));
      };
      return (
        <ButtonDivContainer key={attr + i}>
          <ButtonDiv
            style={attrSelected ? selectedButtonDivStyle : buttonDivStyle}
          >
            <AttrName>{attr.pretty}</AttrName>
            <button
              onClick={handleSortDesc}
              style={descButtonSelected ? selectedButtonStyle : buttonStyle}
            >
              <i className="fas fa-greater-than" />
            </button>
            <button
              onClick={handleSortAsc}
              style={ascButtonSelected ? selectedButtonStyle : buttonStyle}
            >
              <i className="fas fa-less-than" />
            </button>
          </ButtonDiv>
        </ButtonDivContainer>
      );
    });
  }
}
const buttonDivStyle = {};
const selectedButtonDivStyle = { background: "lightblue" };
const buttonStyle = {};
const selectedButtonStyle = { background: "blue", color: "white" };
const ButtonDivContainer = styled.div`
  width: 8rem;
`;
const ButtonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  border: 1px solid #9e9e9e;
  grid-gap: 3px;
  padding: 2px;
  border-radius: 5px;
  background: #f9f9f9;
`;
const AttrName = styled.div`
  grid-column: 1 / -1;
`;

const mapStateToProps = state => ({
  sortedBy: state.house.sortedBy,
  attrNames: state.house.attrNames
});
export default connect(mapStateToProps)(SortButtons);
