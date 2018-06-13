import React, { Component } from "react";
import { FormSection } from "./FormSection";
import { Field } from "redux-form";

export default class AddressFrom extends Component {
  handleChange = e => {
    const value = e.target.value;
    const attr = e.target.name;
    this.props.change(attr, value);
  };
  render() {
    return (
      <FormSection>
        <label htmlFor="addressInput">Street Address</label>
        <Field
          component="input"
          type="text"
          name="location.address"
          id="addressInput"
        />
        <label htmlFor="cityInput">City</label>
        <Field
          component="input"
          type="text"
          name="location.city"
          id="cityInput"
        />
        <label htmlFor="stateInput">State</label>
        <Field
          component="input"
          type="text"
          name="location.state"
          id="stateInput"
        />
        <label htmlFor="zipInput">Zip</label>
        <Field
          component="input"
          type="text"
          name="location.zip"
          id="zipInput"
        />
      </FormSection>
    );
  }
}
