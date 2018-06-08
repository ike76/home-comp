import { createStore, combineReducers } from "redux";
import { mainReducer } from "./reducers/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  main: mainReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
