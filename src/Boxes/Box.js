import React, { Component } from "react";
import styled from "styled-components";
import "./Box.css";
import { connect } from "react-redux";
import { monify, commafy } from "../Helpers/monify";
import { Value, Attribute } from "../UIElements/StyledText";
import { editHome } from "../actions/houseActions";
export class Box extends Component {
  state = {
    editing: false
  };
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };
  render() {
    const { home, slug, name, dispatch, heights } = this.props;
    const { editing } = this.state;

    const StyledBox = styled.div`
      height: ${heights[name.type]};
    `;
    const handleSubmit = e => {
      e.preventDefault();
      const newValue = this.textInput.value;
      dispatch(
        editHome({
          homeId: home._id,
          homeKey: "attributes",
          updateObj: { [slug]: { value: newValue } }
        })
      );
      this.textInput.value = "";
      this.setState({ editing: false });
    };
    const formatValue = (val, name) => {
      switch (name.type) {
        case "price":
          return monify(val);
        case "number":
          return commafy(val);

        default:
          return val;
      }
    };
    const value = formatValue(
      (home.attributes[slug] && home.attributes[slug].value) || 0,
      name
    );
    return (
      <StyledBox className="box">
        <Attribute>{name.pretty}</Attribute>
        {!editing && <Value>{value}</Value>}
        {editing && (
          <form onSubmit={handleSubmit} className="number-form">
            <input
              style={{ width: "3rem", margin: "2px" }}
              type="text"
              ref={x => (this.textInput = x)}
              autoFocus
            />
            <button type="submit">SAVE</button>
          </form>
        )}
        <i
          className="far fa-edit box-edit editToggleButton"
          onClick={this.toggleEditing}
        />
      </StyledBox>
    );
  }
}

const StyledInput = styled.input`
  width: 3rem;
  margin: 2px;
`;

const mapStateToProps = state => ({ heights: state.house.heights });
export default connect(mapStateToProps)(Box);
