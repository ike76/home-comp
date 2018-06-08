import {
  SORT_BY_PRICE,
  SORT_BY_CUSTOM,
  CHANGE_HOME_VALUE,
  ADD_NEW_HOME
} from "../actions/actions";
import { fakeHome } from "../Helpers/fakeHome";

const initialState = {
  attrNames: [
    { slug: "price", pretty: "Price" },
    { slug: "square_ft", pretty: "Square Ft" },
    { slug: "bedrooms", pretty: "Bedrooms" }
  ],
  sortedBy: { attr: "price", ascending: true },
  homes: [fakeHome(), fakeHome(), fakeHome()]
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_PRICE:
      const sortedHomes = state.homes.sort(
        (a, b) => a.price.value - b.price.value
      );
      return {
        ...state,
        homes: [...sortedHomes],
        sortedBy: { attr: "price", ascending: action.ascending }
      };
    case SORT_BY_CUSTOM: {
      const sortedHomes = state.homes.sort((a, b) => {
        const { attr } = action;
        const sort = action.ascending
          ? a[attr].value - b[attr].value
          : b[attr].value - a[attr].value;
        return sort;
      });
      return {
        ...state,
        homes: [...sortedHomes],
        sortedBy: { attr: action.attr, ascending: action.ascending }
      };
    }
    case CHANGE_HOME_VALUE: {
      const homeIndex = state.homes.findIndex(h => h.id === action.homeId);
      const home = state.homes.find(h => h.id === action.homeId);
      const newHome = {
        ...home,
        [action.attr]: { ...home[action.attr], value: action.newValue }
      };
      const newHomes = [...state.homes];
      newHomes[homeIndex] = newHome;
      return { ...state, homes: [...newHomes] };
    }
    case ADD_NEW_HOME: {
      return { ...state, homes: [...state.homes, action.newHomeObj] };
    }
    default:
      return state;
  }
};
