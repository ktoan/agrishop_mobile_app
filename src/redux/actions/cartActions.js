import axios from 'axios';
import {setPending} from '../slices/commonSlice';
import {
  DELETE_CART_URL,
  FETCH_CART_URL,
  UPDATE_CART_URL,
} from '../../constants/Host';
import {deleteCart, setCart, updateCart} from '../slices/appSlice';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/ToastActions';

export const fetchCart = async dispatch => {
  dispatch(setPending(true));
  try {
    const res = await axios.get(FETCH_CART_URL);
    if (res.data.success) {
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.log(error.message);
    dispatch(setPending(false));
  }
};

export const updateUserCart = async (dispatch, productId, quantity) => {
  dispatch(setPending(true));
  try {
    const res = await axios.put(`${UPDATE_CART_URL}`, {
      productId,
      quantity,
    });
    if (res.data.success) {
      dispatch(updateCart(res.data.cartItem));
      dispatch(setPending(false));
      showSuccessToast('Added cart successfully!');
    }
  } catch (error) {
    console.log(error.message);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};

export const deleteUserCart = async (dispatch, cartId) => {
  dispatch(setPending(true));
  try {
    const res = await axios.delete(`${DELETE_CART_URL}/${cartId}`);
    if (res.data.success) {
      showInfoToast(res.data.msg);
      dispatch(deleteCart(cartId));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log(error.message);
    dispatch(setPending(false));
  }
};
