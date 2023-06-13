import axios from 'axios';
import {
  CHANGE_PASSWORD_URL,
  CONFIRM_REGISTRATION_URL,
  LOAD_USER_URL,
  LOGIN_URL,
  REGISTER_URL,
  SEND_CONFIRMED_CODE_URL,
  UPDATE_USER_URL,
} from '../../constants/Host';
import {showErrorToast, showSuccessToast} from '../../utils/ToastActions';
import {removeAuth, setToken, setUser} from '../slices/authSlice';
import {removeLoading, setLoading} from '../slices/commonSlice';

export const loadUser = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(LOAD_USER_URL);
    if (res.data.success) {
      dispatch(setUser(res.data.loadedUser));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(removeLoading());
  }
};

export const loginUser = async (
  dispatch,
  form,
  navigation,
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(LOGIN_URL, form);
    if (res.data.success) {
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(removeLoading());
      next();
    }
  } catch (error) {
    if (error.response.status === 401) {
      navigation.navigate('VerifyAccountScreen', {
        email: form.email,
      });
    }
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const registerNewUser = async (dispatch, form, next = () => {}) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(REGISTER_URL, form);
    if (res.data.success) {
      showSuccessToast(res.data.msg);
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

export const logoutUser = (dispatch, next = () => {}) => {
  dispatch(removeAuth());
  next();
};

export const changePassword = async (
  dispatch,
  form,
  userId,
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.put(`${CHANGE_PASSWORD_URL}/${userId}`, form);
    if (res.data.success) {
      showSuccessToast(res.data.msg);
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

export const updateUserInformation = async (
  dispatch,
  form,
  userId,
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.put(`${UPDATE_USER_URL}/${userId}`, form);
    if (res.data.success) {
      dispatch(setUser(res.data.updatedUser));
      showSuccessToast('Update information successfully!');
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

export const sendConfirmCode = async (
  dispatch,
  email,
  haveEmailHandle = () => {},
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${SEND_CONFIRMED_CODE_URL}?email=${email}`);
    if (res.data.success) {
      showSuccessToast(res.data.msg);
      dispatch(removeLoading());
      next();
    }
  } catch (error) {
    if (error.response.status === 403) {
      haveEmailHandle();
    }
    console.log(error.response.data ? error.response.data.msg : error.message);
    showErrorToast(
      error.response.data ? error.response.data.msg : error.message,
    );
    dispatch(removeLoading());
  }
};

export const confirmRegistration = async (dispatch, token, next = () => {}) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${CONFIRM_REGISTRATION_URL}?token=${token}`);
    if (res.data.success) {
      showSuccessToast(res.data.msg);
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
