// import React from "react";
// import { shallow } from "enzyme";
// import faker from "faker";
// import moxios from "moxios";
// import axios from "axios";
// import { storeFactory } from "../testUtils/testUtils";
// import { HomeFormContainer } from "./HomeFormContainer";
// import { addHome, editHome, removeHome } from "../actions/houseActions";

// const store = storeFactory();

// const setup = (initialState = {}, props) => {
//   const wrapper = shallow(<HomeFormContainer store={store} {...props} />);
//   return wrapper;
// };
// const findByTestAttr = (wrapper, testAttr) => {
//   return wrapper.find(`[data-test='${testAttr}']`);
// };

// describe("<HomeFormContainer/>", () => {
//   let fakeState;
//   describe("when EDITING home", () => {
//     fakeState = {
//       formatted_address: "30135 McLaughlin Union",
//       address: "30135 McLaughlin Union",
//       lat: "21.3349",
//       lng: "158.1082",
//       zip: "52814-3909"
//     };
//     test("mounts without crashing", () => {
//       const wrapper = setup();
//       wrapper.setState(fakeState);
//       const goButton = findByTestAttr(wrapper, "submit-button");
//     });
//     test("displays address information", () => {
//       const wrapper = setup();
//       wrapper.setState(fakeState);
//       const addressDisplay = findByTestAttr(wrapper, "display-address");
//       expect(addressDisplay.exists()).toBe(true);
//       expect(addressDisplay.text()).toBe(fakeState.formatted_address);
//     });
//   });
//   describe("inputting NEW home", () => {
//     beforeEach(() => {
//       moxios.install();
//     });
//     afterEach(() => {
//       moxios.uninstall();
//     });

//     test("should not display address", () => {
//       const wrapper = setup();
//       const addressDisplay = findByTestAttr(wrapper, "display-address");
//       expect(addressDisplay.exists()).toBe(false);
//     });
//     // test("should call addHome", () => {
//     //   const dispatch = jest.fn();
//     //   const wrapper = shallow(
//     //     <HomeFormContainer store={store} dispatch={dispatch} />
//     //   );
//     //   const mockAddHomeAction = { type: "MOCK_ADD_HOME" };
//     //   const mockImplementation = jest.fn().mockImplementation(() => {
//     //     console.log("mockImplementation called");
//     //     return mockAddHomeAction;
//     //   });
//     //   jest.mock("../actions/houseActions", () =>
//     //     Object.assign({}, require.requireActual("../actions/houseActions"), {
//     //       addHome: mockImplementation
//     //     })
//     //   );
//     //   wrapper.setState(fakeState);
//     //   const button = findByTestAttr(wrapper, "submit-button");
//     //   expect(button.length).toBe(1);
//     //   button.simulate("click");
//     //   expect(dispatch).toBeCalledWith({ type: "CLOSE_MODAL" });
//     //   expect(dispatch).toBeCalledWith(addHome(fakeState));
//     //   expect(dispatch.mock.calls.length).toBe(2);
//     // });
//   });
// });
