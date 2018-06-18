import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { FormSection } from "./FormSection";
import FormStarRow from "./FormStarRow";

class NewHomeForm extends Component {
  render() {
    const { attrNames } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h3>i'm here now</h3>
        <FormSection>
          {attrNames.map(attr => {
            const fieldOptions = () => {
              switch (attr.type) {
                case "number":
                  return { component: "input", type: "number" };
                case "price":
                  return { component: "input", type: "number" };
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
                  name={`attributes[${attr.slug}].value`}
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
  attrNames: state.house.attrNames
});
NewHomeForm = connect(mapStateToProps)(NewHomeForm);

export default reduxForm({ form: "newHome" })(NewHomeForm);
