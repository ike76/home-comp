import moxios from "moxios";
import axios from "axios";
import {
  registerUser,
  loginTHUNK,
  authRequest,
  clearAuth,
  authSuccess,
  setAuthToken,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  CLEAR_AUTH,
  SET_AUTH_TOKEN
} from "./authActions";

const setupMox = () => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    const reqUrl = request.config.url;
    const user = request.config.data;
    const authToken = "fakeAuthToken12345";
    console.log("mox called", reqUrl, user);
    request.respondWith({
      status: 200,
      response: { reqUrl, user, authToken }
    });
  });
};

const user = { email: "person@person.com", password: "password" };
describe("registerUser", () => {
  beforeEach(() => {
    moxios.install(axios);
    setupMox();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it(" should call signup", async () => {
    const dispatch = jest.fn();
    const registerUserResponse = await registerUser(user)(dispatch);
    expect(dispatch).toBeCalled();
    expect(JSON.parse(registerUserResponse.user)).toEqual(user);
  });
});
describe("loginTHUNK", () => {
  beforeEach(() => {
    moxios.install(axios);
    setupMox();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it("should dispatch authRequest", () => {
    const mockDispatch = jest.fn();
    return loginTHUNK(user)(mockDispatch).then(response => {
      expect(mockDispatch).toBeCalledWith(authRequest());
    });
  });
});

test("basic authActions", () => {
  expect(authSuccess(user)).toEqual({ type: AUTH_SUCCESS, user });
  expect(authRequest()).toEqual({ type: AUTH_REQUEST });
  expect(clearAuth()).toEqual({ type: CLEAR_AUTH });
  expect(setAuthToken("12345")).toEqual({
    type: SET_AUTH_TOKEN,
    authToken: "12345"
  });
});
