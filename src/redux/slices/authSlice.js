import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setAccessToken, setUser} = authSlice.actions;

export default authSlice.reducer;
