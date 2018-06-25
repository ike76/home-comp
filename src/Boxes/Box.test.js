import React from "react";
import { shallow, mount, render } from "enzyme";
import { Box } from "./Box";

import { Value, Attribute } from "../UIElements/StyledText";

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
  it("should edit when button is clicked", () => {
    const wrapper = shallow(<Box {...fakeProps} />);
    const instance = wrapper.instance();
    expect(instance.state.editing).toBe(false);
    instance.toggleEditing();
    expect(instance.state.editing).toBe(true);
  });
  it("should dislay the attribute name", () => {
    const wrapper = mount(<Box {...fakeProps} />);
    console.log(wrapper.contains(<Attribute />));
  });
});
