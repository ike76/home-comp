import {
  SORT_BY_CUSTOM,
  CHANGE_HOME_VALUE,
  ADD_NEW_HOME,
  ADD_ATTRIBUTE,
  EDIT_ATTRIBUTE,
  DELETE_ATTRIBUTE,
  SET_IMAGE_PUBLIC_ID
} from "../actions/actions";
import { fakeHome } from "../Helpers/fakeHome";

const homes = JSON.parse(localStorage.getItem("myHomes")) || [
  fakeHome(),
  fakeHome(),
  fakeHome(),
  fakeHome(),
  fakeHome()
];

const attrNames = JSON.parse(localStorage.getItem("myAttrs")) || [
  { slug: "price", pretty: "Price", type: "price" },
  { slug: "square_ft", pretty: "Square Ft", type: "number" },
  { slug: "bedrooms", pretty: "Bedrooms", type: "number" },
  { slug: "kitchen", pretty: "Kitchen", type: "image" }
];

const initialState = {
  heights: { number: "2.5rem", price: "2.5rem", image: "5rem" },
  displayMessage: "wuzzup",
  attrNames,
  sortedBy: { attr: "price", ascending: true },
  homes
};

export const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_CUSTOM: {
      const sortedHomes = state.homes.sort((a, b) => {
        const { attr } = action;
        const aValue = a.attributes[attr].value;
        const bValue = b.attributes[attr].value;
        const sort = action.ascending ? aValue - bValue : bValue - aValue;
        return sort;
      });
      return {
        ...state,
        homes: [...sortedHomes],
        sortedBy: { attr: action.attr, ascending: action.ascending }
      };
    }
    case CHANGE_HOME_VALUE: {
      const homeIndex = state.homes.findIndex(h => h._id === action.homeId);
      const home = state.homes.find(h => h._id === action.homeId);
      const newHome = {
        ...home,
        attributes: {
          ...home.attributes,
          [action.attr]: {
            ...home.attributes[action.attr],
            value: action.newValue
          }
        }
      };
      const newHomes = [...state.homes];
      newHomes[homeIndex] = newHome;
      return { ...state, homes: newHomes };
    }
    case ADD_NEW_HOME: {
      return { ...state, homes: [...state.homes, action.house] };
    }

    case ADD_ATTRIBUTE: {
      const updatedHomes = state.homes.map(home => ({
        ...home,
        attributes: { ...home.attributes, [action.attr.slug]: { value: 0 } }
      }));
      localStorage.setItem(
        "myAttrs",
        JSON.stringify([...state.attrNames, action.attr])
      );
      localStorage.setItem("myHomes", JSON.stringify(updatedHomes));
      return {
        ...state,
        homes: updatedHomes
      };
    }
    case EDIT_ATTRIBUTE: {
      return state;
    }
    case DELETE_ATTRIBUTE: {
      return state;
    }
    case SET_IMAGE_PUBLIC_ID: {
      const { homeId, attr, publicId } = action;
      const homeIndex = state.homes.findIndex(home => home._id === homeId);
      const home = state.homes[homeIndex];
      const newHome = {
        ...home,
        attributes: {
          ...home.attributes,
          [attr]: { ...home.attributes[attr], imagePublicId: publicId }
        }
      };
      const newHomes = [...state.homes];
      newHomes[homeIndex] = newHome;
      localStorage.setItem("myHomes", JSON.stringify(newHomes));
      return { ...state, homes: newHomes };
    }

    default:
      return state;
  }
};
