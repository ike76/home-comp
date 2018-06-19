import {
  SORT_BY_CUSTOM,
  CHANGE_HOME_VALUE,
  ADD_NEW_HOME,
  SET_IMAGE_PUBLIC_ID
} from "../actions/actions";
import {
  ADD_ATTRIBUTE,
  EDIT_HOME,
  UPDATE_ALL_HOMES,
  UPDATE_ATTRIBUTES
} from "../actions/houseActions";
import uuid from "uuid";
const homes = [];

const attrNames = JSON.parse(localStorage.getItem("myAttrs")) || [
  { slug: "price", pretty: "Price", type: "price", id: uuid() },
  { slug: "square_ft", pretty: "Square Ft", type: "number", id: uuid() },
  { slug: "bedrooms", pretty: "Bedrooms", type: "number", id: uuid() },
  {
    slug: "to_work",
    pretty: "To Work",
    type: "map",
    lat: 36.155165,
    lng: -86.782559,
    id: uuid()
  },
  { slug: "kitchen", pretty: "Kitchen", type: "image", id: uuid() }
];

const initialState = {
  heights: { number: "2.5rem", price: "2.5rem", image: "5rem", map: "4rem" },
  displayMessage: "wuzzup",
  attrNames,
  sortedBy: { attr: "price", ascending: true },
  homes
};

export const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTES: {
      const { attrNames } = action;
      return { ...state, attrNames };
    }
    case SORT_BY_CUSTOM: {
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

    case CHANGE_HOME_VALUE: {
      const { homeId, attr, newValue } = action;
      const homeIndex = state.homes.findIndex(h => h._id === homeId);
      const home = state.homes.find(h => h._id === homeId);
      const newHome = {
        ...home,
        attributes: {
          ...home.attributes,
          [attr]: {
            ...home.attributes[attr],
            value: newValue
          }
        }
      };
      const newHomes = [...state.homes];
      newHomes[homeIndex] = newHome;
      return { ...state, homes: newHomes };
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
    case ADD_NEW_HOME: {
      return { ...state, homes: [...state.homes, action.house] };
    }

    case ADD_ATTRIBUTE: {
      if (state.attrNames.find(attr => attr.slug === action.attr.slug)) {
        console.log("that attribute already exists");
        return state;
      }
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
        attrNames: [...state.attrNames, action.attr],
        homes: updatedHomes
      };
    }

    case EDIT_HOME: {
      const { updatedHouse } = action;
      const newHomes = state.homes.map(
        oldHome => (oldHome._id === updatedHouse._id ? updatedHouse : oldHome)
      );
      console.log("newHomes", newHomes);
      return { ...state, homes: [...newHomes] };
    }
    case UPDATE_ALL_HOMES: {
      const { newHomes } = action;
      return { ...state, homes: newHomes };
    }
    default:
      return state;
  }
};
