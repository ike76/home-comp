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
    const { home, slug } = this.props;
    const handleSubmit = e => {
      e.preventDefault();
      const newValue = this.textInput.value;
      this.props.dispatch(changeHomeValue(home.id, slug, newValue));
    };
    const { editing } = this.state;
    return (
      <StyleBox>
        {!editing && <p>{home[slug] && home[slug].value}</p>}
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
const StyleBox = styled.div`
  border: 1px black solid;
  border-radius: 4px;
  // width: 15rem;
  display: flex;
  position: relative;
  align-content: center;
  justify-content: center;
`;
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Box);
