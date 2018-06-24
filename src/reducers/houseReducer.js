import {
  SORT_HOMES,
  ADD_HOME_SUCCESS,
  UPDATE_ALL_HOMES,
  UPDATE_ATTRIBUTES,
  EDIT_HOME_SUCCESS,
  RESET_STORE,
  HOMES_REQUEST,
  HOMES_SUCCESS,
  HOMES_ERROR
} from "../actions/houseActions";
import uuid from "uuid";
const homes = [];

const attrNames = [
  { slug: "price", pretty: "Price", type: "price", id: uuid() },
  { slug: "square_ft", pretty: "Square Ft", type: "number", id: uuid() },
  { slug: "bedrooms", pretty: "Bedrooms", type: "number", id: uuid() },
  {
    slug: "to_work",
    pretty: "To Work",
    type: "map",
    address: "1234 Something Street",
    lat: 36.155165,
    lng: -86.782559,
    id: uuid()
  },
  { slug: "kitchen", pretty: "Kitchen", type: "image", id: uuid() }
];

const initialState = {
  heights: {
    number: "2.5rem",
    price: "2.5rem",
    image: "5rem",
    map: "4rem",
    roof: "2.5rem"
  },
  attrNames,
  sortedBy: { attr: "price", ascending: true },
  homes,
  loading: false
};

export const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTES: {
      const { attrNames } = action;
      return { ...state, attrNames };
    }
    case SORT_HOMES: {
      const sortedHomes = state.homes.sort((a, b) => {
        const { attr } = action;
        const aValue = a.attributes[attr] ? a.attributes[attr].value : 0;
        const bValue = b.attributes[attr] ? b.attributes[attr].value : 0;
        const sort = action.ascending ? aValue - bValue : bValue - aValue;
        return sort;
      });
      return {
        ...state,
        homes: [...sortedHomes],
        sortedBy: { attr: action.attr, ascending: action.ascending }
      };
    }
    case HOMES_REQUEST: {
      return { ...state, loading: true };
    }
    case HOMES_SUCCESS: {
      const { homes } = action;
      return { ...state, homes, loading: false };
    }
    case ADD_HOME_SUCCESS: {
      return { ...state, homes: [...state.homes, action.house] };
    }

    case EDIT_HOME_SUCCESS: {
      const { updatedHouse } = action;
      const newHomes = state.homes.map(
        oldHome => (oldHome._id === updatedHouse._id ? updatedHouse : oldHome)
      );
      console.log("newHomes", newHomes);
      return { ...state, homes: [...newHomes] };
    }
    case UPDATE_ALL_HOMES: {
      const { homes } = action;
      return { ...state, homes };
    }
    case RESET_STORE: {
      return { ...state, homes: [], attrNames: [] };
    }
    default:
      return state;
  }
};
