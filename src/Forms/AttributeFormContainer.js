import React, { Component } from "react";
import { connect } from "react-redux";
import slugify from "slugify";

import AttributeForm from "./AttributeForm";
import { addAttribute } from "../actions/actions";

class FormContainer extends Component {
  submit = values => {
    const pretty = values.attrName;
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const attrType = "image";
    const attrObject = { pretty, slug, type: attrType };
    this.props.dispatch(addAttribute(attrObject));
  };
  render() {
    return (
      <div>
        <h2>Add an Attribute</h2>
        <AttributeForm
          onSubmit={this.submit}
          initialValues={{ attrName: "" }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(FormContainer);
