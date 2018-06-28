import React from "react";
import { shallow, mount } from "enzyme";
import StarRow from "./StarRow";
import { findByTestAttr } from "../testUtils/testUtils";

const setup = (specialProps, value = 3) => {
  const defaultProps = {
    home: { attributes: { kitchen: { value } } },
    name: "kitchen"
  };
  const props = { ...defaultProps, ...specialProps };
  const wrapper = shallow(<StarRow {...props} />);
  return wrapper;
};

describe("StarRow", () => {
  it("mounts without crashing", () => {
    const wrapper = setup();
  });
  it("displays 7 stars", () => {
    const wrapper = setup({}, 4);
    const stars = findByTestAttr(wrapper, "star");
    expect(stars.length).toBe(7);
  });
  it("fills the correct # of stars", () => {
    const testStarCount = 4;
    const wrapper = setup({}, testStarCount);
    const filledStars = wrapper.find("[filled=true]");
    expect(filledStars.length).toBe(testStarCount);
  });
});
