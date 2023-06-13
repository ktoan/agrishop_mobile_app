import axios from 'axios';
import {FETCH_POSTS_URL} from '../../constants/Host';
import {removeLoading, setLoading} from '../slices/commonSlice';
import {setPosts} from '../slices/postSlice';

export const fetchPosts = async dispatch => {
  dispatch(setLoading());
  try {
    const res = await axios.get(FETCH_POSTS_URL);
    if (res.data.success) {
      dispatch(setPosts(res.data.posts));
      dispatch(removeLoading());
    }
  } catch (error) {
    console.log(error.response.data ? error.response.data.msg : error.message);
    dispatch(removeLoading());
  }
};
