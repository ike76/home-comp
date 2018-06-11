import React, { Component } from "react";
import { connect } from "react-redux";
import slugify from "slugify";

import NewHomeForm from "./NewHomeForm";
import AttributeForm from "./AttributeForm";
import {
  addAttribute,
  editAttribute,
  deleteAttribute
} from "../actions/actions";

class FormContainer extends Component {
  submit = values => {
    const pretty = values.attrName;
    const slug = slugify(pretty, { replacement: "_", lower: true });
    const attrType = "image";
    const attr = { pretty, slug, type: attrType };
    this.props.dispatch(addAttribute(attr));
  };
  render() {
    return (
      <div>
        <h2>Add an Attribute</h2>
        {/* <NewHomeForm onSubmit={this.submit} /> */}
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
