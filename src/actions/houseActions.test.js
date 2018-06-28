import moxios from "moxios";
import { getMyHomes, homesRequest, homesSuccess } from "./houseActions";

describe("houseActions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("dispatches request and success", async () => {
    const dispatch = jest.fn();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const reqUrl = request.config.url;
      request.respondWith({
        status: 200,
        response: { fakeHome: "nice", reqUrl }
      });
    });

    return getMyHomes()(dispatch).then(moxResponse => {
      expect(moxResponse.reqUrl).toContain("/house/getAll");
      expect(dispatch).toBeCalledWith(homesRequest());
      expect(dispatch).toBeCalledWith(homesSuccess(moxResponse));
    });
  });
});
