import React from "react";
import { shallow, mount } from "enzyme";
import { AttributeForm } from "./AttributeForm";

const defaultProps = {};
const setup = specialProps => {
  const props = { ...defaultProps, ...specialProps };
  const wrapper = shallow(<AttributeForm {...props} />);
  return wrapper;
};

describe("AttributeForm", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
  });
});
