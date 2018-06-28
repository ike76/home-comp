import React from "react";
import { shallow } from "enzyme";

import { HomeForm } from "./HomeForm";
import { findByTestAttr } from "../testUtils/testUtils";

describe("homeForm", () => {
  it("mounts without crashing", () => {
    const wrapper = shallow(<HomeForm />);
  });
  it("displays address if avail", () => {
    const wrapper = shallow(<HomeForm />);
    wrapper.setState({ formatted_address: "12345 main st" });
    const displayAddress = findByTestAttr(wrapper, "display-address");
    expect(displayAddress.text()).toContain("12345 main st");
  });
});
