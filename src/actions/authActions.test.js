import moxios from "moxios";
import axios from "axios";
import {
  registerUser,
  loginTHUNK,
  authRequest,
  clearAuth,
  authSuccess,
  setAuthToken,
  getMyHomes,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  CLEAR_AUTH,
  SET_AUTH_TOKEN
} from "./authActions";
import jwt_decode from "jwt-decode";
import { updateAttributes } from "./houseActions";

const setupMox = () => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    const reqUrl = request.config.url;
    const user = request.config.data;
    const authToken = process.env.REACT_APP_TEST_JWT_TOKEN;
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
    const dispatch = jest.fn();
    return loginTHUNK(user)(dispatch).then(authToken => {
      const newUser = jwt_decode(authToken).sub;
      expect(dispatch).toBeCalledWith(authRequest());
      expect(dispatch).toBeCalledWith(updateAttributes(newUser.homeAttributes));
      expect(dispatch).toBeCalledWith(authSuccess(newUser));
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
