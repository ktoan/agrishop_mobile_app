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

export const fetchProductsByCategory = (products, code) => {
  if (code === 'all') return products;
  const newProducts = products.filter(p => {
    let consistCategory = p.categories.some(category => category.code === code);
    if (consistCategory) return p;
  });
  return newProducts;
};
