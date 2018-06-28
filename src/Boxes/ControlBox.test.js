import React from "react";
import { shallow } from "enzyme";
import ControlBox from "./ControlBox";
import { findByTestAttr } from "../testUtils/testUtils";
const getWrapper = specialProps => {
  const defaultProps = {
    sortedBy: "x",
    attr: "x",
    click: jest.fn(),
    height: "x"
  };
  const props = { ...defaultProps, ...specialProps };
  const wrapper = shallow(<ControlBox {...props} />);
  return wrapper;
};

describe("Control Box", () => {
  it("renders without crashing", () => {
    const wrapper = getWrapper();
  });
  it("displays the attribute name", () => {
    const wrapper = getWrapper({
      attr: { pretty: "Backyard", slug: "backyard" }
    });
    const display = wrapper.find(`[data-test='name-display']`);
    expect(display.html()).toContain("Backyard");
  });
  it("shows up arrow when selected and sorted asc", () => {
    const wrapper = getWrapper({
      sortedBy: { attr: "backyard", ascending: true },
      attr: { slug: "backyard" }
    });
    const arrow = findByTestAttr(wrapper, "sort-arrow");
    expect(arrow.html()).toContain("selected");
    expect(arrow.html()).toContain("up");
  });
  it("shows down arrow when selected and sorted desc", () => {
    const wrapper = getWrapper({
      sortedBy: { attr: "backyard", ascending: false },
      attr: { slug: "backyard" }
    });
    const arrow = findByTestAttr(wrapper, "sort-arrow");
    expect(arrow.html()).toContain("selected");
    expect(arrow.html()).toContain("down");
  });
  it("shows unselected otherwise", () => {
    const wrapper = getWrapper({
      sortedBy: { attr: "backyard", ascending: true },
      attr: { slug: "some other attr" }
    });
    const arrow = findByTestAttr(wrapper, "sort-arrow");
    expect(arrow.html()).toContain("unselected");
  });
});
