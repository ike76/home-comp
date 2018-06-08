export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const sortByPrice = ascending => ({
  type: SORT_BY_PRICE,
  ascending
});
export const SORT_BY_CUSTOM = "SORT_BY_CUSTOM";
export const sortByCustom = (attr, ascending) => ({
  type: SORT_BY_CUSTOM,
  attr,
  ascending
});
export const CHANGE_HOME_VALUE = "CHANGE_HOME_VALUE";
export const changeHomeValue = (homeId, attr, newValue) => ({
  type: CHANGE_HOME_VALUE,
  homeId,
  attr,
  newValue
});
export const ADD_NEW_HOME = "ADD_NEW_HOME";
export const addNewHome = newHomeObj => ({
  type: ADD_NEW_HOME,
  newHomeObj
});
