import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from './ProductsScreen';
import ProductDetailsScreen from './ProductDetailsScreen';

const ProductStack = createNativeStackNavigator();

const Product = () => {
  return (
    <ProductStack.Navigator screenOptions={{headerShown: false}}>
      <ProductStack.Screen name="ProductsScreen" component={ProductsScreen} />
      <ProductStack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </ProductStack.Navigator>
  );
};

export default Product;
