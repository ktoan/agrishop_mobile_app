import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isPending: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPending: (state, {payload}) => {
      state.isPending = payload;
    },
  },
});

export const {setPending} = commonSlice.actions;

export default commonSlice.reducer;
