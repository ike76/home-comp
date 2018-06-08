import React, { Component } from "react";
import NewHomeForm from "./NewHomeForm";

export default class FormContainer extends Component {
  submit = values => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <h2>Add a Home or whatever</h2>
        <NewHomeForm onSubmit={this.submit} />
      </div>
    );
  }
}
