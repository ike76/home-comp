import React, { Component } from "react";
import styled from "styled-components";
import "./Box.css";
import { connect } from "react-redux";
import { changeHomeValue } from "./actions/actions";
export class Box extends Component {
  state = {
    editing: false
  };
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };
  render() {
    const { home, slug, colNumber, rowNumber, name } = this.props;

    const StyleBox = styled.div`
      border: 1px black solid;
      border-radius: 4px;
      display: grid;
      grid-template-rows: 1.5rem 1rem;
      position: relative;
      align-items: center;
      justify-content: center;
      margin: 2px 5px;
      padding: 3px;
    `;
    const handleSubmit = e => {
      e.preventDefault();
      const newValue = this.textInput.value;
      this.props.dispatch(changeHomeValue(home.id, slug, newValue));
    };
    const { editing } = this.state;
    return (
      <StyleBox>
        {!editing && <Value>{home[slug] && home[slug].value}</Value>}
        <Attribute>{name.pretty}</Attribute>
        {editing && (
          <form onSubmit={handleSubmit} className="number-form">
            <input type="text" ref={x => (this.textInput = x)} />
            <button type="submit">SAVE</button>
          </form>
        )}
        <i className="far fa-edit box-edit" onClick={this.toggleEditing} />
      </StyleBox>
    );
  }
}
const Value = styled.div`
  text-align: center;
`;
const Attribute = styled.div`
  color: lightgrey;
  font-size: 0.8rem;
  text-align: center;
`;
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Box);
