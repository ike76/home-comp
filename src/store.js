import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import { houseReducer } from "./reducers/houseReducer";
import { reducer as formReducer } from "redux-form";
import { uiReducer } from "./reducers/uiReducer";
import { authReducer } from "./reducers/authReducer";
import thunk from "redux-thunk";
import { loadAuthToken } from "./actions/localStorage";
import { setAuthToken, refreshAuthToken } from "./actions/authActions";

const logger = createLogger({
  collapsed: true,
  diff: true
});
export const rootReducer = combineReducers({
  house: houseReducer,
  form: formReducer,
  ui: uiReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const authToken = loadAuthToken();
if (authToken) {
  store.dispatch(setAuthToken(authToken));
  store.dispatch(refreshAuthToken());
}

export default store;
