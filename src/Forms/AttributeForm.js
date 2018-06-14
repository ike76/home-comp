import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";

let AttributeForm = props => {
  const { handleSubmit, pristine } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="attrName">Name</label>
        <div>{pristine ? "clean" : "dirty"}</div>
        <Field name="attrName" id="attrName" component="input" type="text" />
        <div
          style={{ gridColumn: "1/-1", textAlign: "center", padding: "1rem" }}
        >
          <button type="submit" disabled={pristine}>
            SAVE
          </button>
          <button>DELETE</button>
          <button>SAVE CHANGES</button>
        </div>
      </Form>
    </div>
  );
};

AttributeForm = reduxForm({ form: "Attribute" })(AttributeForm);
export default AttributeForm;

const Form = styled.form`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 0.5rem;
`;
