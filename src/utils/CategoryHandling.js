export const convertCategoryFromServerToRendered = categories => {
  if (categories.length === 0) return [];
  const newArr = [];
  categories.map(category => {
    newArr.push({label: category.name, value: category.code});
  });
  return newArr;
};
