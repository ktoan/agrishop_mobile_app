import axios from 'axios';
import {setPending} from '../slices/commonSlice';
import {FETCH_PRODUCTS_URL} from '../../constants/Host';
import {setProducts, setProductsByCategory} from '../slices/appSlice';
import {fetchProductsByCategory} from '../../utils/ProductHandling';

export const fetchProducts = async dispatch => {
  dispatch(setPending(true));
  try {
    const res = await axios.get(FETCH_PRODUCTS_URL);
    if (res.data.success) {
      dispatch(setProducts(res.data.products));
      dispatch(setProductsByCategory(res.data.products.slice(0, 3)));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log('Fetch Products error: ', error.response);
    dispatch(setPending(false));
  }
};

export const fetchProductsCategory = (dispatch, products, code) => {
  dispatch(setProductsByCategory(fetchProductsByCategory(products, code)));
};
