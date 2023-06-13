import axios from 'axios';
import {removeLoading, setLoading} from '../slices/commonSlice';
import {
  CREATE_ADDRESS_URL,
  DELETE_ADDRESS_URL,
  FETCH_ADDRESSES_URL,
  UPDATE_ADDRESS_URL,
} from '../../constants/Host';
import {
  createAddress,
  removeAddress,
  setAddresses,
  updateAddress,
} from '../slices/addressSlice';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/ToastActions';

export const fetchUserAddresses = async (dispatch, userId) => {
  dispatch(setLoading());
  try {
    const res = await axios.get(`${FETCH_ADDRESSES_URL}/${userId}`);
    if (res.data.success) {
      dispatch(setAddresses(res.data.userAddresses));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};

export const createUserAddress = async (dispatch, form, next = () => {}) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(CREATE_ADDRESS_URL, form);
    if (res.data.success) {
      showSuccessToast('Create address successfully!');
      dispatch(createAddress(res.data.newAddress));
      dispatch(removeLoading());
      next();
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const updateUserAddress = async (
  dispatch,
  form,
  addressId,
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.put(`${UPDATE_ADDRESS_URL}/${addressId}`, form);
    if (res.data.success) {
      dispatch(
        updateAddress({
          addressId,
          updatedAddress: res.data.updatedAddress,
        }),
      );
      showSuccessToast('Update address successfully!');
      dispatch(removeLoading());
      next();
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const deleteUserAddress = async (dispatch, addressId) => {
  dispatch(setLoading());
  try {
    const res = await axios.delete(`${DELETE_ADDRESS_URL}/${addressId}`);
    if (res.data.success) {
      showInfoToast(res.data.msg);
      dispatch(removeAddress(addressId));
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
