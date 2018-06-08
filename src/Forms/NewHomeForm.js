import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

import { addNewHome } from "../actions/actions";
import { fakeHome } from "../Helpers/fakeHome";
import AddressForm from "./AddressForm";
import ReduxAddressForm from "./ReduxAddressForm";

import { FormSection } from "./FormSection";

export class NewHomeForm extends Component {
  constructor(props) {
    super(props);
    this.houseFormInputs = {};
    this.state = {
      location: {
        address: "",
        city: "",
        state: "",
        zip: "",
        lat: "",
        lng: ""
      }
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    Object.keys(this.houseFormInputs).map(slug => console.log(slug));
    this.props.dispatch(addNewHome(fakeHome));
  };
  logSubmit = values => {
    // values.preventDefault();
    console.log("logSubmit was called");
    console.log("values", values);
  };
  updateLocation = (attr, val) => {
    this.setState(prevState => ({
      location: { ...prevState.location, [attr]: val }
    }));
  };
  render() {
    const { attrNames } = this.props;
    return (
      <FormSection>
        <ReduxAddressForm onSubmit={this.logSubmit} />
      </FormSection>
    );
    return (
      <div>
        <h2>Add New Home</h2>
        <form>
          <AddressForm
            change={this.updateLocation}
            values={this.state.location}
          />
          <FormSection onSubmit={this.handleSubmit}>
            {attrNames.map(attr => (
              <Fragment key={attr.slug}>
                <label htmlFor={`${attr.slug}input`}> {attr.pretty} </label>
                <input
                  type="text"
                  id={`${attr.slug}input`}
                  ref={x => (this.houseFormInputs[attr.slug] = x)}
                />
              </Fragment>
            ))}
          </FormSection>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attrNames: state.main.attrNames
});

export default connect(mapStateToProps)(NewHomeForm);
