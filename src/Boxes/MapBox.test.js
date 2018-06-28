import React from "react";
import { shallow, mount } from "enzyme";
import { MapBox } from "./MapBox";

import { findByTestAttr } from "../testUtils/testUtils";
import { openModal } from "../actions/uiActions";

const defaultProps = {
  heights: {},
  name: { slug: "kitchen", pretty: "Kitchen" },
  home: {
    _id: "123456789",
    attributes: {
      kitchen: {
        distanceNum: 1234,
        distanceText: "1234 miles",
        durationText: "1234 minutes"
      }
    }
  }
};
const setup = (specialProps, mountBool) => {
  const props = { ...defaultProps, ...specialProps };
  const shallowWrapper = shallow(<MapBox {...props} />);
  const mountWrapper = mount(<MapBox {...props} />);
  return mountBool ? mountWrapper : shallowWrapper;
};

describe("<MapBox/>", () => {
  it("loads without crashing", () => {
    const wrapper = setup();
  });

  it("shows distance", () => {
    const wrapper = setup({}, true);
    const distanceText = findByTestAttr(wrapper, "distance-text");
    expect(distanceText.text()).toContain("1234 miles");
  });
  it("shows travel time", () => {
    const wrapper = setup();
    const travelText = findByTestAttr(wrapper, "travel-time-text");
    console.log(travelText.debug());
    expect(travelText.text()).toContain("1234 minutes");
  });
  test("button opens modal", () => {
    const dispatch = jest.fn();
    const wrapper = setup({ dispatch });
    const button = findByTestAttr(wrapper, "open-modal-button");
    button.simulate("click");
    expect(dispatch).toBeCalledWith(openModal(`map ${defaultProps.home._id}`));
  });
});
