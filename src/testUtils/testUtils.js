import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../store";
import ReduxThunk from "redux-thunk";
const middlewares = [ReduxThunk];

export const storeFactory = initialState => {
  const createStoreWithMiddleWare = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleWare(rootReducer, initialState);
};

export const findByTestAttr = (wrapper, testAttr) => {
  return wrapper.find(`[data-test='${testAttr}']`);
};
