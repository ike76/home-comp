import React from "react";
import { shallow } from "enzyme";
import { Star } from "./Star";
import { findByTestAttr } from "../testUtils/testUtils";

const setup = specialProps => {
  const props = { ...specialProps };
  const wrapper = shallow(<Star {...props} />);
  return wrapper;
};

describe("Star", () => {
  it("should mount without crashing", () => {
    const wrapper = setup();
  });
  it("should display filled", () => {
    const wrapper = setup({ filled: true });
    const star = findByTestAttr(wrapper, "star");
    expect(star.length).toBe(1);
    expect(star.html()).toContain("filled");
  });
  it("should display empty", () => {
    const wrapper = setup({ filled: false });
    const star = findByTestAttr(wrapper, "star");
    expect(star.length).toBe(1);
    expect(star.html()).not.toContain("filled");
  });
  it("should call changeRating if clicked", () => {
    const callback = jest.fn();
    const wrapper = setup({ changeRating: callback });
    const star = findByTestAttr(wrapper, "star");
    star.simulate("click");
    expect(callback).toBeCalled();
  });
});
