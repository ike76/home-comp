import React from "react";
import { shallow, mount, render } from "enzyme";
import { Box } from "./Box";
import { findByTestAttr } from "../testUtils/testUtils";
import moxios from "moxios";
import { Value, Attribute } from "../UIElements/StyledText";
import { editHome } from "../actions/houseActions";

let fakeProps;
const setup = (extraProps, mountBool) => {
  fakeProps = {
    name: { pretty: "PrettyName" },
    home: { attributes: [], _id: "12345" },
    slug: "kitchen",
    heights: {}
  };
  const props = { ...fakeProps, ...extraProps };
  const shallowWrap = shallow(<Box {...props} />);
  const mountWrap = mount(<Box {...props} />);
  return mountBool ? mountWrap : shallowWrap;
};

describe("Box", () => {
  it("should render without crashing", () => {
    const wrapper = setup();
  });
  it("should display name of attribute", () => {});
  it("should toggle edit when button is clicked", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(instance.state.editing).toBe(false);
    instance.toggleEditing();
    expect(instance.state.editing).toBe(true);
  });
  it("should dispatch edited info", async () => {
    const dispatch = jest.fn();
    const wrapper = setup({ dispatch }, true);
    wrapper.setState({ editing: true });
    const input = findByTestAttr(wrapper, "box-input");
    input.simulate("change", { target: { value: "1234" } });
    const form = findByTestAttr(wrapper, "number-form");
    form.simulate("submit");
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
