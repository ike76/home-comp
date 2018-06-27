import { refreshAuthToken, registerUser } from "./authActions";
import moxios from "moxios";
describe("auth actions", () => {
  const fakeUser = { email: "fakey@me.com", password: "password" };
  const dispatch = jest.fn();
  const mockPost = jest.fn().mockImplementation(() => {
    return "PRETEND POST sucka";
  });
  jest.mock("./serverAPI", () => {
    Object.assign({}, require.requireActual("./serverAPI"), { post: mockPost });
  });

  //   test("sends register user", () => {
  //     return registerUser(fakeUser)(dispatch).then(response => {
  //       console.log(response);
  //       console.log(dispatch.mock.calls);
  //     });
  //   });
});
it("calls signin endpoint", () => {});
