import React, { Component } from "react";
import styled from "styled-components";
import "./Box.css";
import { connect } from "react-redux";
import { changeHomeValue } from "../actions/actions";
import { monify, commafy } from "../Helpers/monify";
import { Value, Attribute } from "../UIElements/StyledText";
export class Box extends Component {
  state = {
    editing: false
  };
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };
  render() {
    const { home, slug, name, dispatch, heights } = this.props;
    const StyledBox = styled.div`
      height: ${heights[name.type]};
    `;
    const handleSubmit = e => {
      e.preventDefault();
      const newValue = this.textInput.value;
      dispatch(changeHomeValue(home.id, slug, newValue));
      this.textInput.value = "";
      this.setState({ editing: false });
    };
    const { editing } = this.state;
    const formatValue = val => {
      switch (name.type) {
        case "price":
          return monify(val);
        case "number":
          return commafy(val);
        default:
          return val;
      }
    };
    const value = formatValue(home[slug].value);
    name.type === "price" ? monify(home[slug].value) : home[slug].value;
    return (
      <StyledBox className="box">
        {!editing && <Value>{value}</Value>}
        <Attribute>{name.pretty}</Attribute>
        {editing && (
          <form onSubmit={handleSubmit} className="number-form">
            <input type="text" ref={x => (this.textInput = x)} />
            <button type="submit">SAVE</button>
          </form>
        )}
        <i className="far fa-edit box-edit" onClick={this.toggleEditing} />
      </StyledBox>
    );
  }
}

// const Value = styled.div`
//   text-align: center;
// `;
// const Attribute = styled.div`
//   color: lightgrey;
//   font-size: 0.8rem;
//   text-align: center;
// `;
const mapStateToProps = state => ({ heights: state.main.heights });
export default connect(mapStateToProps)(Box);
