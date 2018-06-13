import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import AddressForm from "./AddressForm";

import { FormSection } from "./FormSection";
import FormStarRow from "./FormStarRow";

class NewHomeForm extends Component {
  handleSubmit = values => {
    values.preventDefault();
    console.log(values);
  };

  updateLocation = (attr, val) => {
    this.setState(prevState => ({
      location: { ...prevState.location, [attr]: val }
    }));
  };
  render() {
    const { attrNames } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <AddressForm />
        <FormSection>
          {attrNames.map(attr => {
            const fieldOptions = () => {
              switch (attr.type) {
                case "number":
                  return { component: "input", type: "text" };
                case "price":
                  return { component: "input", type: "text" };
                case "image":
                  return { component: FormStarRow, type: "" };
                default:
                  return null;
              }
            };
            return (
              <Fragment key={attr.slug}>
                <label htmlFor={`${attr.slug}input`}> {attr.pretty} </label>
                <Field
                  component={fieldOptions().component}
                  type={fieldOptions().type}
                  id={`${attr.slug}input`}
                  name={attr.slug}
                />
              </Fragment>
            );
          })}
        </FormSection>
        <button type="submit"> SAVE </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  attrNames: state.main.attrNames,
  customAttrNames: state.main.customAttrNames
});
NewHomeForm = connect(mapStateToProps)(NewHomeForm);

export default reduxForm({ form: "newHome" })(NewHomeForm);
