import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  products: [],
  productsByCategory: [],
  posts: [],
  cart: [],
  addresses: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsByCategory: (state, action) => {
      state.productsByCategory = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    updateCart: (state, action) => {
      const newCart = [...state.cart];
      const cartItem = action.payload;
      let isProductExistingInCart = newCart.some(
        cart => cart.product.id === cartItem.product.id,
      );
      if (isProductExistingInCart) {
        const updatedCartIndex = newCart.findIndex(
          cart => cart.id === cartItem.id,
        );
        newCart[updatedCartIndex] = cartItem;
      } else {
        newCart.push(cartItem);
      }
      state.cart = [...newCart];
    },
    deleteCart: (state, action) => {
      const cartId = action.payload;
      const newCart = [...state.cart];
      let deletedCartIndex = newCart.findIndex(cart => cart.id === cartId);
      newCart.splice(deletedCartIndex, 1);
      state.cart = [...newCart];
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    createAddress: (state, action) => {
      const newAddress = [...state.addresses];
      newAddress.push(action.payload);
      state.addresses = [...newAddress];
    },
    updateAddress: (state, action) => {
      const updatedAddress = action.payload.updatedAddress;
      const newAddress = [...state.addresses];
      let updatedAddressIndex = newAddress.findIndex(
        address => address.id === updatedAddress.id,
      );
      newAddress[updatedAddressIndex] = updatedAddress;
      state.addresses = [...newAddress];
    },
    deleteAddress: (state, action) => {
      const addressId = action.payload;
      const newAddress = [...state.addresses];
      let deletedAddressIndex = newAddress.findIndex(
        address => address.id === addressId,
      );
      newAddress.splice(deletedAddressIndex, 1);
      state.addresses = [...newAddress];
    },
  },
});

export const {
  setCart,
  setProducts,
  setPosts,
  setCategories,
  setAddresses,
  updateAddress,
  createAddress,
  setProductsByCategory,
  deleteAddress,
  updateCart,
  deleteCart,
} = appSlice.actions;

export default appSlice.reducer;
