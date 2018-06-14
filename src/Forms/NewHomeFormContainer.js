import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import faker from "faker";
import Modal from "../Utilities/Modal";
import NewHomeForm from "./NewHomeForm";
import { addHome } from "../actions/houseActions";

class AddHome extends Component {
  state = {
    showModal: false
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  handleSubmit = values => {
    console.log(values);
    this.props.dispatch(addHome(values));
  };
  componentDidMount() {
    console.log(this.props.attrNames);
  }
  render() {
    const zeroValues = () => {
      const initialAttributes = {};
      this.props.attrNames.forEach(
        attr => (initialAttributes[attr.slug] = { value: 0 })
      );
      const _initialValues = {
        attributes: initialAttributes
      };
      return _initialValues;
    };
    const appropriateRandomNumbers = {
      price: faker.random.number(200000) + 200000,
      square_ft: faker.random.number(1000) + 1000,
      bedrooms: faker.random.number(4) + 2
    };
    const fakeInitialValues = () => {
      const attributes = {};
      console.log(this.props.attrNames);
      this.props.attrNames.forEach(
        attr =>
          (attributes[attr.slug] = {
            value: appropriateRandomNumbers[attr.slug] || faker.random.number(7)
          })
      );
      const location = {
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      };
      const initialValues = { attributes, location };
      return initialValues;
    };
    const initialValues = this.props.fake ? fakeInitialValues() : zeroValues();
    return (
      <Fragment>
        <button onClick={this.openModal}>
          ADD {this.props.fake ? "FAKE " : null}HOME
        </button>
        {this.state.showModal && (
          <Modal close={this.closeModal}>
            <NewHomeForm
              onSubmit={this.handleSubmit}
              initialValues={initialValues}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  attrNames: state.house.attrNames
});
export default connect(mapStateToProps)(AddHome);
