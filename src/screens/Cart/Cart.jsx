import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListCartScreen from './ListCartScreen';
import CheckoutScreen from './CheckoutScreen';

const CartStack = createNativeStackNavigator();

const Cart = () => {
  return (
    <CartStack.Navigator screenOptions={{headerShown: false}}>
      <CartStack.Screen name="ListCartScreen" component={ListCartScreen} />
      <CartStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
};

export default Cart;
