import React, { Component } from "react";
import { connect } from "react-redux";
import ControlBox from "./Boxes/ControlBox";
import AddressBox from "./AddressBox";
import { sortByCustom } from "./actions/actions";
import Button from "./UIElements/Button";
import FormContainer from "./Forms/AttributeFormContainer";
import Modal from "./Utilities/Modal";

class ControlHouse extends Component {
  state = {
    modalOpen: false
  };
  handleClick = attr => {
    console.log("attr", attr.slug);
    const ascending =
      this.props.sortedBy.attr === attr.slug
        ? !this.props.sortedBy.ascending
        : "true";
    this.props.dispatch(sortByCustom(attr.slug, ascending));
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  openModal = () => {
    this.setState({ modalOpen: true });
  };
  render() {
    const { attrNames, sortedBy, heights } = this.props;
    return (
      <div
        className="house"
        style={{ padding: "1.5rem 10px", border: "5px solid white" }}
      >
        <AddressBox addy="SORT BY:" />
        {attrNames.map((attr, i) => {
          return (
            <ControlBox
              key={attr + i}
              attr={attr}
              click={() => this.handleClick(attr)}
              sortedBy={sortedBy}
              height={heights[attr.type]}
            />
          );
        })}

        <Button text="ADD" click={this.openModal} />
        {this.state.modalOpen && (
          <Modal close={this.closeModal}>
            <FormContainer />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sortedBy: state.house.sortedBy,
  attrNames: state.house.attrNames,
  heights: state.house.heights
});
export default connect(mapStateToProps)(ControlHouse);
