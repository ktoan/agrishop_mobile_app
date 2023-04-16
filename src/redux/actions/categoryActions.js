import axios from 'axios';
import {setPending} from '../slices/commonSlice';
import {FETCH_CATEGORIES_URL} from '../../constants/Host';
import {setCategories} from '../slices/appSlice';

export const fetchCategories = async dispatch => {
  dispatch(setPending(true));
  try {
    const res = await axios.get(FETCH_CATEGORIES_URL);
    if (res.data.success) {
      dispatch(setCategories(res.data.categories));
      dispatch(setPending(false));
    }
  } catch (error) {
    console.log('Fetch Categories error: ', error.message);
    dispatch(setPending(false));
  }
};
