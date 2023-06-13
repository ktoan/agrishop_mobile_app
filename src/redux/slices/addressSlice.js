import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    createAddress: (state, action) => {
      const newAddresses = [...state.addresses];
      newAddresses.push(action.payload);
      state.addresses = [...newAddresses];
    },
    updateAddress: (state, action) => {
      const {addressId, updatedAddress} = action.payload;
      const newAddresses = [...state.addresses];
      let updateIndex = newAddresses.findIndex(
        address => address.id === addressId,
      );
      newAddresses[updateIndex] = updatedAddress;
      state.addresses = [...newAddresses];
    },
    removeAddress: (state, action) => {
      const removeId = action.payload;
      const newAddresses = [...state.addresses];
      let removeIndex = newAddresses.findIndex(
        address => address.id === removeId,
      );
      newAddresses.splice(removeIndex, 1);
      state.addresses = [...newAddresses];
    },
  },
});

export const {setAddresses, removeAddress, createAddress, updateAddress} =
  addressSlice.actions;

export default addressSlice.reducer;
