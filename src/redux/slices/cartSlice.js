const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  cart: [],
  orders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    updateCart: (state, action) => {
      const newData = [...state.cart];
      const cartItem = action.payload;
      let existedIndex = newData.findIndex(c => c.id === cartItem.id);
      if (existedIndex !== -1) {
        newData[existedIndex].quantity = cartItem.quantity;
      } else {
        newData.push(cartItem);
      }
      state.cart = [...newData];
    },
    removeCart: (state, action) => {
      const removeId = action.payload;
      const newCart = [...state.cart];
      let removeIndex = newCart.findIndex(cartItem => cartItem.id === removeId);
      newCart.splice(removeIndex, 1);
      state.cart = [...newCart];
    },
    changeCartItemQuantity: (state, action) => {
      const newCart = [...state.cart];
      const {cartItemId, dir} = action.payload;
      let updateIndex = newCart.findIndex(item => item.id === cartItemId);
      newCart[updateIndex].quantity =
        dir === 'minus'
          ? newCart[updateIndex].quantity - 1
          : newCart[updateIndex].quantity + 1;
      state.cart = [...newCart];
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    createOrders: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const {
  setCart,
  updateCart,
  removeCart,
  changeCartItemQuantity,
  setOrders,
  createOrders,
} = cartSlice.actions;

export default cartSlice.reducer;
