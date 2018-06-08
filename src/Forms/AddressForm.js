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
        <Field component="input" type="text" name="address" />
        <label htmlFor="addressInput">City</label>
        <Field component="input" type="text" name="city" />
        <label htmlFor="addressInput">State</label>
        <Field component="input" type="text" name="state" />
      </FormSection>
    );
  }
}
