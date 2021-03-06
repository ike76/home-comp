export const required = value => (value ? undefined : "Required");
export const nonEmpty = value =>
  value.trim() !== "" ? undefined : "Cannot be empty";
export const isTrimmed = value =>
  value.trim() === value ? undefined : "Cannot start or end with whitespace";
export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `min ${length.min} characters`;
  }
  if (length.max && value.length > length.max) {
    return `max ${length.max} characters`;
  }
};
export const matches = field => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : "Does not match";
