import React from "react";
import { Field, reduxForm } from "redux-form";

let AddressForm = props => {
  const { handleSubmit } = props;
  const localHandleSubmit = () => {
    handleSubmit;
    props.reset(); // clears the input fields
  };
  return (
    <form onSubmit={localHandleSubmit}>
      <label htmlFor="fakeInput">Fake Input</label>
      <Field component="input" type="text" id="fakeInput" name="fakeInput" />
      <label htmlFor="otherFakeInput">Fake Input 2</label>
      <Field
        component="input"
        type="text"
        id="otherFakeInput"
        name="otherFakeInputName"
      />
      <button type="submit"> GO </button>
    </form>
  );
};

AddressForm = reduxForm({ form: "address" })(AddressForm);

export default AddressForm;
