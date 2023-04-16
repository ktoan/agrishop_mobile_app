import {setError, setSuccess} from '../redux/slices/commonSlice';

export const handleSuccess = (dispatch, message) => {
  dispatch(setSuccess(message));
  setTimeout(() => {
    dispatch(setSuccess(null));
  }, 2000);
};

export const handleError = (dispatch, message) => {
  dispatch(setError(message));
  setTimeout(() => {
    dispatch(setError(null));
  }, 2000);
};
