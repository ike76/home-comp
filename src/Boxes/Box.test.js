import React from "react";
import { shallow, mount, render } from "enzyme";
import { Box } from "./Box";
import { findByTestAttr } from "../testUtils/testUtils";
import moxios from "moxios";
import { Value, Attribute } from "../UIElements/StyledText";
import { editHome } from "../actions/houseActions";

const fakeProps = {
  name: { pretty: "PrettyName" },
  home: { attributes: [] },
  slug: "hey",
  heights: {}
};

describe("Box", () => {
  it("should render without crashing", () => {
    shallow(<Box {...fakeProps} />);
  });
  it("should toggle edit when button is clicked", () => {
    const wrapper = shallow(<Box {...fakeProps} />);
    const instance = wrapper.instance();
    expect(instance.state.editing).toBe(false);
    instance.toggleEditing();
    expect(instance.state.editing).toBe(true);
  });
  it("should dispatch edited info", async () => {
    const dispatch = jest.fn();
    const wrapper = mount(<Box {...fakeProps} dispatch={dispatch} />);
    wrapper.setState({ editing: true });
    const form = findByTestAttr(wrapper, "number-form");
    form.simulate("submit");
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
