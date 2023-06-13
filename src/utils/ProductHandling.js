import {checkStringContaining} from './StringUtils';

export const calculateProductStar = product => {
  if (product.reviews.length === 0) return 0;
  let total = product.reviews.reduce(
    (total, review) => total + review.value,
    0,
  );
  return (total / product.reviews.length).toFixed(1);
};

export const calculateTotalPriceCart = cart => {
  if (cart.length === 0) return 0;
  let total = cart.reduce(
    (total, cart) => total + cart.product.price * cart.quantity,
    0,
  );
  return total;
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

export const fetchProductsByCategory = (products, categoryCode) => {
  if (categoryCode === 'all') return products.slice(0, 3);
  const newProducts = products.filter(p => {
    let consistCategory = p.categories.some(
      category => category.code === categoryCode,
    );
    if (consistCategory) return p;
  });
  return newProducts.slice(0, 3);
};

export const getProductById = (products, productId) => {
  const getIndex = products.findIndex(product => product.id === productId);
  return products[getIndex];
};

export const fetchProductByFilters = (products, filters) => {
  if (!filters) {
    return products;
  }
  const {nameLiked, priceRange, rateRange} = filters;
  let newProducts;
  // Fetch by nameLike
  if (nameLiked) {
    newProducts = products.filter(p => {
      if (checkStringContaining(p.name, nameLiked)) {
        return p;
      }
    });
    products = newProducts;
  }
  // Fetch by price range
  if (priceRange) {
    let minPrice = priceRange[0];
    let maxPrice = priceRange[1];
    if (!(minPrice === 0 && maxPrice === 0)) {
      newProducts = products.filter(p => {
        if (p.price >= minPrice && p.price <= maxPrice) {
          return p;
        }
      });
      products = newProducts;
    }
  }
  // Fetch by rate range
  if (rateRange) {
    let minRate = rateRange[0];
    let maxRate = rateRange[1];
    if (!(minRate === 0 && maxRate === 0)) {
      newProducts = products.filter(p => {
        if (
          calculateProductStar(p) >= minRate &&
          calculateProductStar(p) <= maxRate
        ) {
          return p;
        }
      });
      products = newProducts;
    }
  }
  return products;
};

export const calculateListCartOrOrderPrice = list => {
  if (list.length === 0)
    return {
      subTotal: (0).toFixed(2),
      saleOff: (0).toFixed(2),
      total: (0).toFixed(2),
    };

  const subTotal = list
    .reduce((total, next) => total + next.product.price * next.quantity, 0)
    .toFixed(2);
  const saleOff = list
    .reduce(
      (total, next) =>
        total +
        (next.product.price / 100) * next.product.saleOff * next.quantity,
      0,
    )
    .toFixed(2);
  const total = list
    .reduce(
      (total, next) =>
        total +
        (next.product.price -
          (next.product.price / 100) * next.product.saleOff) *
          next.quantity,
      0,
    )
    .toFixed(2);
  return {subTotal, saleOff, total};
};
