import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeAuth: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {setUser, setToken, removeAuth} = authSlice.actions;

export default authSlice.reducer;
