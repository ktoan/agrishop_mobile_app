import axios from 'axios';
import {CREATE_REVIEW_URL, FETCH_PRODUCTS_URL} from '../../constants/Host';
import {showErrorToast, showInfoToast} from '../../utils/ToastActions';
import {removeLoading, setLoading} from '../slices/commonSlice';
import {addReview, setFilters, setProducts} from '../slices/productSlice';

export const fetchProducts = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(FETCH_PRODUCTS_URL);
    if (res.data.success) {
      dispatch(setProducts(res.data.products));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};

export const addReviewToProduct = async (
  dispatch,
  form,
  productId,
  next = () => {},
) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(
      `${CREATE_REVIEW_URL}?productId=${productId}`,
      form,
    );
    if (res.data.success) {
      dispatch(
        addReview({
          newReview: res.data.newReview,
          productId,
        }),
      );
      dispatch(removeLoading());
      showInfoToast('Add review successfully!');
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

export const changeFilters = (dispatch, newFilters) => {
  dispatch(setFilters(newFilters || {}));
};

export const fetchProductDetails = async (
  productId,
  next = () => {},
  errorHandle = () => {},
) => {
  try {
    const res = await axios.get(`${FETCH_PRODUCTS_URL}/${productId}`);
    if (res.data.success) {
      next(res.data.product);
    }
  } catch (error) {
    errorHandle(error.response.data ? error.response.msg : error.message);
  }
};
