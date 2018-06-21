import React from "react";
import { shallow } from "enzyme";
import { Box } from "./Box";

describe("Box", () => {
  it("should render without crashing", () => {
    shallow(<Box />);
  });
});
