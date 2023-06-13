import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './slices/authSlice';
import commonSlice from './slices/commonSlice';
import productSlice from './slices/productSlice';
import categorySlice from './slices/categorySlice';
import addressSlice from './slices/addressSlice';
import cartSlice from './slices/cartSlice';
import postSlice from './slices/postSlice';

const reducer = combineReducers({
  auth: authSlice,
  common: commonSlice,
  product: productSlice,
  category: categorySlice,
  address: addressSlice,
  cart: cartSlice,
  post: postSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistRdc = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistRdc,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const Store = {store, persistor};

export default Store;
