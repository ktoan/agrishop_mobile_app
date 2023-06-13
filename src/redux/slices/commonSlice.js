import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  productFilters: {
    categories: [],
    rangeRate: [0, 0],
    rangeValue: [0, 0],
  },
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: state => {
      state.isLoading = true;
    },
    removeLoading: state => {
      state.isLoading = false;
    },
  },
});

export const {setLoading, removeLoading} = commonSlice.actions;

export default commonSlice.reducer;
