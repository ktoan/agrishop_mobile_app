import axios from 'axios';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/ToastActions';
import {setPending} from '../slices/commonSlice';
import {
  CREATE_ADDRESS_URL,
  DELETE_ADDRESS_URL,
  FETCH_ADDRESSES_URL,
  UPDATE_ADDRESS_URL,
  UPDATE_USER_URL,
} from '../../constants/Host';
import {setUser} from '../slices/authSlice';
import {
  createAddress,
  deleteAddress,
  setAddresses,
  updateAddress,
} from '../slices/appSlice';

export const updateInformation = async (dispatch, userId, form, next) => {
  dispatch(setPending(true));
  try {
    const res = await axios.put(`${UPDATE_USER_URL}/${userId}`, form);
    if (res.data.success) {
      dispatch(setUser(res.data.updatedUser));
      dispatch(setPending(false));
      showSuccessToast('Update user information successfully!');
      next();
    }
  } catch (error) {
    console.log(error.response);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};

export const fetchAddresses = async (dispatch, userId) => {
  dispatch(setPending(true));
  try {
    const res = await axios.get(`${FETCH_ADDRESSES_URL}/${userId}`);
    if (res.data.success) {
      dispatch(setAddresses(res.data.userAddresses));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log('Fetch Addresses error: ', error.message);
    dispatch(setPending(false));
  }
};

export const createUserAddress = async (dispatch, form, next) => {
  dispatch(setPending(true));
  try {
    const res = await axios.post(CREATE_ADDRESS_URL, form);
    if (res.data.success) {
      showSuccessToast('Create address successfully!');
      dispatch(setPending(false));
      dispatch(createAddress(res.data.newAddress));
      next();
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch(setPending(false));
  }
};

export const updateUserAddress = async (dispatch, addressId, form, next) => {
  dispatch(setPending(true));
  try {
    const res = await axios.put(`${UPDATE_ADDRESS_URL}/${addressId}`, form);
    if (res.data.success) {
      dispatch(updateAddress({updatedAddress: res.data.updatedAddress}));
      dispatch(setPending(false));
      showSuccessToast('Update address successfully!');
      next();
    }
  } catch (error) {
    console.log(error.message);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};

export const deleteUserAddress = async (dispatch, addressId) => {
  dispatch(setPending(true));
  try {
    const res = await axios.delete(`${DELETE_ADDRESS_URL}/${addressId}`);
    if (res.data.success) {
      showInfoToast(res.data.msg);
      dispatch(deleteAddress(addressId));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log(error.message);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};
