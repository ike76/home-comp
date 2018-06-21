import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import { houseReducer } from "./reducers/houseReducer";
import { reducer as formReducer } from "redux-form";
import { uiReducer } from "./reducers/uiReducer";
import { userReducer } from "./reducers/userReducer";
import { authReducer } from "./reducers/authReducer";
import thunk from "redux-thunk";
import { loadAuthToken } from "./localStorage";
import { setAuthToken, refreshAuthToken } from "./actions/authActions";

const logger = createLogger({
  /* https://github.com/evgenyrodionov/redux-logger */
  collapsed: true,
  diff: true
});
const rootReducer = combineReducers({
  house: houseReducer,
  form: formReducer,
  ui: uiReducer,
  user: userReducer,
  auth: authReducer
});
// TODO user, addHome etc.  not "main"

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const authToken = loadAuthToken();
if (authToken) {
  store.dispatch(setAuthToken(authToken));
  store.dispatch(refreshAuthToken());
}

export default store;
