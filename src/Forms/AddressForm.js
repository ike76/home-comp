import React, { Component } from "react";
import { FormSection } from "./FormSection";

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
        <input
          type="text"
          name="address"
          value={this.props.values.address}
          onChange={this.handleChange}
        />
        <label htmlFor="addressInput">City</label>
        <input
          type="text"
          name="city"
          value={this.props.values.city}
          onChange={this.handleChange}
        />
        <label htmlFor="addressInput">State</label>
        <input
          type="text"
          name="state"
          value={this.props.values.state}
          onChange={this.handleChange}
        />
      </FormSection>
    );
  }
}
