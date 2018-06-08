import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import Column from "./Column";
import AttrNames from "./AttrNames";
import AddressBox from "./AddressBox";
import NewHomeForm from "./Forms/NewHomeForm";

import Modal from "./Utilities/Modal";
import "./HomeGrid.css";
export class Homegrid extends Component {
  state = {
    columns: 4,
    rows: 2,
    showModal: true
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { homes, attrNames } = this.props;
    const Grid = styled.div`
      display: grid;
      grid-template-columns: max-content repeat(
          ${homes.length},
          minmax(max-content, 1fr)
        );
      grid-template-rows: repeat(${attrNames.length + 1}, 1fr);
      grid-column-gap: 1.5rem;
      grid-row-gap: 3px;
      grid-auto-flow: column;
      // background: salmon;
    `;
    return (
      <div className="grid-wrapper">
        <Grid>
          <AttrNames />
          {homes.map(home => (
            <Column key={home.id} home={home} attrNames={attrNames} />
          ))}
          <AddressBox addy="NEW" />
        </Grid>
        {this.state.showModal && (
          <Modal close={this.closeModal}>
            <NewHomeForm />
          </Modal>
        )}
        <button onClick={() => this.setState({ showModal: true })}>show</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  attrNames: state.main.attrNames,
  homes: state.main.homes
});
export default connect(mapStateToProps)(Homegrid);
