import axios from 'axios';
import {removeLoading, setLoading} from '../slices/commonSlice';
import {
  CREATE_ORDER,
  DELETE_CART_URL,
  FETCH_CART_URL,
  FETCH_ORDER_URL,
  UPDATE_CART_URL,
} from '../../constants/Host';
import {
  changeCartItemQuantity,
  createOrders,
  removeCart,
  setCart,
  setOrders,
  updateCart,
} from '../slices/cartSlice';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/ToastActions';

export const fetchUserCart = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(FETCH_CART_URL);
    if (res.data.success) {
      dispatch(setCart(res.data.cart));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};

export const updateUserCart = async (dispatch, form) => {
  dispatch(setLoading());
  try {
    const res = await axios.put(UPDATE_CART_URL, form);
    if (res.data.success) {
      dispatch(updateCart(res.data.cartItem));
      showSuccessToast('Add product to cart successfully!');
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const deleteUserCart = async (dispatch, cartId) => {
  dispatch(setLoading());
  try {
    const res = await axios.delete(`${DELETE_CART_URL}/${cartId}`);
    if (res.data.success) {
      dispatch(removeCart(cartId));
      showInfoToast(res.data.msg);
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const changeQuantity = async (dispatch, cartItemId, dir) => {
  dispatch(
    changeCartItemQuantity({
      dir,
      cartItemId,
    }),
  );
};

export const fetchUserOrders = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(FETCH_ORDER_URL);
    if (res.data.success) {
      dispatch(setOrders(res.data.orders));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.msg : error.message);
    dispatch(removeLoading());
  }
};

export const createNewOrder = async (
  dispatch,
  form,
  next = () => {},
  errorHandle = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(CREATE_ORDER, form);
    if (res.data.success) {
      dispatch(createOrders(res.data.newOrder));
      next();
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error);
    errorHandle(error.response.data ? error.response.data.msg : error.message);
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};
