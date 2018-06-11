import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { mainReducer } from "./reducers/reducers";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  main: mainReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
