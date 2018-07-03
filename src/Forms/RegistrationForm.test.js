import React from "react";
import { shallow, mount } from "enzyme";
import { RegistrationForm } from "./RegistrationForm";
import { findByTestAttr } from "../testUtils/testUtils";
const setup = specialProps => {
  const props = { ...specialProps, classes: {} };
  const wrapper = shallow(<RegistrationForm {...props} />);
  return wrapper;
};

describe("registration form", () => {
  it("renders without crashing", () => {
    const handleSubmit = jest.fn();
    const wrapper = setup({ handleSubmit });
  });
  it("calls submit fxn when submitted", () => {
    const handleSubmit = jest.fn();
    const wrapper = setup({ handleSubmit });
    const form = findByTestAttr(wrapper, "login-form");
    form.simulate("submit");
    expect(handleSubmit).toBeCalled();
  });
});
