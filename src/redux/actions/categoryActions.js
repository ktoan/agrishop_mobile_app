import axios from 'axios';
import {removeLoading, setLoading} from '../slices/commonSlice';
import {FETCH_CATEGORIES_URL} from '../../constants/Host';
import {setCategories} from '../slices/categorySlice';

export const fetchCategories = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(FETCH_CATEGORIES_URL);
    if (res.data.success) {
      dispatch(setCategories(res.data.categories));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};
