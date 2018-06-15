import React, { Component } from "react";
import { connect } from "react-redux";
import slugify from "slugify";
import uuid from "uuid";
import AttributeForm from "./AttributeForm";
import { addAttribute, editAttribute } from "../actions/houseActions";

class FormContainer extends Component {
  submit = values => {
    const pretty = values.attrName;
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const attrType = "image";
    const id = (this.props.attr && this.props.attr.id) || uuid();
    const attrObject = { pretty, slug, type: attrType, id };
    this.props.dispatch(addAttribute(attrObject));
  };
  render() {
    const { attr } = this.props;
    const attrValues = !attr
      ? {}
      : {
          attrName: attr.pretty
        };
    return (
      <div>
        <h2> Add New Attribute</h2>
        <AttributeForm onSubmit={this.submit} initialValues={attrValues} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(FormContainer);
