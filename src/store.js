import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { houseReducer } from "./reducers/houseReducer";
import { reducer as formReducer } from "redux-form";
import { uiReducer } from "./actions/uiReducer";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  house: houseReducer,
  form: formReducer,
  ui: uiReducer
});
// TODO user, addHome etc.  not "main"

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
