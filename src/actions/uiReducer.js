import { OPEN_MODAL, CLOSE_MODAL } from "./uiActions";

const initialState = {
  modalOpen: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalOpen: action.modalName };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false };
    default:
      return state;
  }
};
