export const dirtyValues = (dirtyFields, allValues) => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])]),
  );
};
