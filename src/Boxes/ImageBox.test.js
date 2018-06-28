import React from "react";
import { shallow, mount } from "enzyme";
import { ImageBox } from "./ImageBox";
import { findByTestAttr } from "../testUtils/testUtils";
import { Provider } from "react-redux";
import store from "../store";
const setup = (specialProps, mountBool) => {
  const baseProps = {
    home: { attributes: { kithen: { value: 3 } } },
    name: { slug: "kitchen" },
    heights: {}
  };
  const props = { ...baseProps, ...specialProps };
  const wrapper = mountBool
    ? mount(
        <Provider store={store}>
          <ImageBox {...props} />
        </Provider>
      )
    : shallow(<ImageBox {...props} />);
  return wrapper;
};

describe("Image Box", () => {
  // open close modal
  // display correct stars

  it("should render without crashing", () => {
    const wrapper = setup();
  });
  it("should display correct amount of stars", () => {
    const correctStars = 3;
    const wrapper = setup(
      {
        home: { attributes: [{ kitchen: { value: 3 } }] },
        name: { slug: "kitchen" }
      },
      true
    );
    // this isnt working.
  });
});
