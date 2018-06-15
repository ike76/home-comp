import {
  SORT_BY_CUSTOM,
  CHANGE_HOME_VALUE,
  ADD_NEW_HOME,
  SET_IMAGE_PUBLIC_ID
} from "../actions/actions";
import {
  ADD_ATTRIBUTE,
  DELETE_ATTRIBUTE,
  EDIT_ATTRIBUTE
} from "../actions/houseActions";
import { fakeHome } from "../Helpers/fakeHome";
import uuid from "uuid";
const homes = JSON.parse(localStorage.getItem("myHomes")) || [
  fakeHome(),
  fakeHome(),
  fakeHome(),
  fakeHome(),
  fakeHome()
];

const attrNames = JSON.parse(localStorage.getItem("myAttrs")) || [
  { slug: "price", pretty: "Price", type: "price", id: uuid() },
  { slug: "square_ft", pretty: "Square Ft", type: "number", id: uuid() },
  { slug: "bedrooms", pretty: "Bedrooms", type: "number", id: uuid() },
  { slug: "kitchen", pretty: "Kitchen", type: "image", id: uuid() }
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
    case EDIT_ATTRIBUTE: {
      const { attr } = action;
      console.log("attr", attr);
      const newAttrNames = state.attrNames.map(attrName => {
        if (attrName.slug !== attr.slug) {
          return attr;
        }
        return attrName;
      });
      const newHomes = state.homes.map(home => {
        const newAttributes = { ...home.attributes };
        const newHome = { ...home, attributes: newAttributes };
      });
      console.log("newAttrNames", newAttrNames);
      return { ...state, attrNames: newAttrNames };
    }
    case DELETE_ATTRIBUTE: {
      const { attr } = action;
      // remove from attrNames
      const newAttrNames = state.attrNames.filter(
        attrName => attrName.id !== attr.id
      );
      const newHomes = state.homes.map(home => {
        delete home.attributes[attr.slug];
        return home;
      });
      return { ...state, attrNames: newAttrNames, homes: newHomes };
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
