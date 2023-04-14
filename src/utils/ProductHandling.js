export const calculateProductStar = product => {
  if (product.reviews.length === 0) return 0;
  let total = product.reviews.reduce(
    (total, review) => total + review.value,
    0,
  );
  return total / product.reviews.length;
};

export const getMaxAndMinPriceProduct = products => {
  if (products.length === 0) return {max: 0, min: 0};
  const maxProduct = products.reduce((prev, curr) =>
    prev.price > curr.price ? prev : curr,
  );
  const minProduct = products.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr,
  );
  return {max: maxProduct.price, min: minProduct.price};
};
