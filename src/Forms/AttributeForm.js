import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import Input from "./Input";
let AttributeForm = props => {
  const { handleSubmit, pristine, attrType, onChange } = props;
  type: "price";
  return (
    // <div>
    //   <Form onSubmit={handleSubmit}>
    //     <Field
    //       name="attrName"
    //       id="attrName"
    //       component={Input}
    //       type="text"
    //       label="Name"
    //       onChange={onChange}
    //     />
    //     <div>
    //       <label>Type</label>
    //       <button
    //         className={props.attrType === "price" ? "selected" : null}
    //         onClick={() => props.click("price")}
    //       >
    //         Price
    //       </button>
    //       <button
    //         className={props.attrType === "price" ? "selected" : null}
    //         onClick={() => props.click("number")}
    //       >
    //         Number
    //       </button>
    //       <button
    //         className={props.attrType === "price" ? "selected" : null}
    //         onClick={() => props.click("photo")}
    //       >
    //         Photo / Rating
    //       </button>
    //       <button
    //         className={props.attrType === "price" ? "selected" : null}
    //         onClick={() => props.click("map")}
    //       >
    //         Distance Map
    //       </button>
    //     </div>
    //     <div
    //       style={{ gridColumn: "1/-1", textAlign: "center", padding: "1rem" }}
    //     >
    //       <button type="submit" disabled={pristine}>
    //         SAVE
    //       </button>
    //     </div>
    //   </Form>
    // </div>
  );
};

AttributeForm = reduxForm({ form: "Attribute" })(AttributeForm);
export default AttributeForm;

const Form = styled.form`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 0.8rem;
`;
