import moxios from "moxios";
import axios from "axios";

import {
  post,
  getProtected,
  postProtected,
  deleteProtected
} from "./serverAPI";

const setupMox = () => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    const reqUrl = request.config.url;
    const reqObj = request.config.data;
    request.respondWith({
      status: 200,
      response: { reqUrl, reqObj }
    });
  });
};

describe("serverAPI", () => {
  const path = "/testAPI/stuff";
  beforeEach(() => {
    moxios.install(axios);
    setupMox();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  test("getProtected works", () => {
    const url = "/get/protected";
    return getProtected(url).then(({ reqUrl }) => {
      expect(reqUrl).toContain(url);
    });
  });
  test("postProtected works", () => {
    const url = "/post/protected";
    const sendObj = { foo: "bar" };
    return postProtected(url, sendObj).then(({ reqUrl, reqObj }) => {
      expect(reqUrl).toContain(url);
      expect(JSON.parse(reqObj)).toEqual(sendObj);
    });
  });
  test("post works", () => {
    const url = "/post";
    const sendObj = { foo: "bar" };
    return post(url, sendObj).then(({ reqUrl, reqObj }) => {
      expect(reqUrl).toContain(url);
      expect(JSON.parse(reqObj)).toEqual(sendObj);
    });
  });
  test("deleteProtected works", () => {
    const url = "/post";
    return deleteProtected(url).then(({ reqUrl }) => {
      expect(reqUrl).toContain(url);
    });
  });
});
