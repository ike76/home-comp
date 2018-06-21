import React, { Component } from "react";
import { connect } from "react-redux";
import ControlBox from "./Boxes/ControlBox";
import AddressBox from "./AddressBox";
import { sortByCustom } from "./actions/houseActions";
import { openModal, closeModal } from "./actions/uiActions";
import { Link } from "react-router-dom";
import Button from "./UIElements/Button";
import AttributeFormContainer from "./Forms/AttributeFormContainer";
import Modal from "./Utilities/Modal";

class ControlHouse extends Component {
  state = {
    editingAttribute: {}
  };
  handleClick = attr => {
    console.log("attr", attr.slug);
    const ascending =
      this.props.sortedBy.attr === attr.slug
        ? !this.props.sortedBy.ascending
        : true;
    this.props.dispatch(sortByCustom(attr.slug, ascending));
  };

  newAttribute = () => {
    this.setState({ editingAttribute: {} });
    this.props.dispatch(openModal("attributeForm"));
  };
  closeModal = () => {
    this.props.dispatch(closeModal());
  };
  openModal = () => {
    this.props.dispatch(openModal("attributeForm"));
  };
  render() {
    const { attrNames, sortedBy, heights } = this.props;
    return (
      <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
        {/* <AddressBox addy="SORT BY:" /> */}
        <div style={{ height: this.props.heights.roof }}>
          <Link to="/attributes">
            <Button text="EDIT Attributes" />
          </Link>
        </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sortedBy: state.house.sortedBy,
  attrNames: state.house.attrNames,
  heights: state.house.heights,
  modalOpen: state.ui.modalOpen
});
export default connect(mapStateToProps)(ControlHouse);
