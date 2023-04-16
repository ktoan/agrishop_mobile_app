import axios from 'axios';
import {setPending} from '../slices/commonSlice';
import {LOAD_USER_URL, LOGIN_URL, REGISTER_URL} from '../../constants/Host';
import {setAccessToken, setUser} from '../slices/authSlice';
import {setAuthToken} from '../../utils/SetAuthToken';
import {showErrorToast, showSuccessToast} from '../../utils/ToastActions';

export const loadUser = async dispatch => {
  dispatch(setPending(true));
  try {
    const res = await axios.get(LOAD_USER_URL);
    if (res.data.success) {
      dispatch(setUser(res.data.loadedUser));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log(error.message);
    dispatch(setAccessToken(null));
    dispatch(setUser(null));
    dispatch(setPending(false));
  }
};

export const login = async (dispatch, form) => {
  dispatch(setPending(true));
  try {
    const res = await axios.post(LOGIN_URL, form);
    if (res.data.success) {
      dispatch(setAccessToken(res.data.token));
      setAuthToken(res.data.token);
      dispatch(setUser(res.data.user));
      dispatch(setPending(false));
      showSuccessToast('Login successfully!');
    }
  } catch (error) {
    console.log(error.message);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};

export const logout = dispatch => {
  dispatch(setUser(null));
  dispatch(setAccessToken(null));
};

export const register = async (dispatch, form, next) => {
  dispatch(setPending(true));
  try {
    const res = await axios.post(REGISTER_URL, form);
    if (res.data.success) {
      showSuccessToast(res.data.msg);
      dispatch(setPending(false));
      next();
    }
  } catch (error) {
    console.log(error.message);
    showErrorToast(error.message);
    dispatch(setPending(false));
  }
};
