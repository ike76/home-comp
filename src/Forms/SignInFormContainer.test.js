import React from "react";
import { shallow } from "enzyme";
import { SignInFormContainer } from "./SignInFormContainer";

describe("signin form", () => {
  it("mounts without crashing", () => {
    const wrapper = shallow(<SignInFormContainer />);
    console.log(wrapper.debug());
  });
});
