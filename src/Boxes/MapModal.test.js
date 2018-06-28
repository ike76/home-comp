import { shallow, mount } from "enzyme";
import React from "react";
import MapModal from "./MapModal";

import { findByTestAttr } from "../testUtils/testUtils";

const defaultProps = {
  directions: { routes: [{ legs: [{ distance: { text: "yo" } }] }] }
};
const setup = specialProps => {
  const props = { ...defaultProps, ...specialProps };
  const wrapper = mount(<MapModal {...props} />);
  return wrapper;
};

describe("MapModal", () => {
  it("should mount without crashing", () => {
    const wrapper = setup();
  });
});
