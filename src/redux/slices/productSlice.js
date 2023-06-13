import {createSlice} from '@reduxjs/toolkit';
import {getProductById} from '../../utils/ProductHandling';

const initialState = {
  products: [],
  filters: {
    nameLiked: '',
    priceRange: [0, 0],
    rateRange: [0, 5],
    categories: [{label: 'Beetroot', value: 'beetroot'}],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addReview: (state, action) => {
      const {productId, newReview} = action.payload;
      let index = state.products.findIndex(p => p.id === productId);
      state.products[index].reviews.push(newReview);
    },
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    },
  },
});

export const {setProducts, addReview, setFilters} = productSlice.actions;

export default productSlice.reducer;
