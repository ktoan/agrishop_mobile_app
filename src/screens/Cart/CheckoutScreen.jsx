import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';

const CheckoutScreen = ({navigation}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Checkout" backEnabled navigation={navigation} />
      )}>
      <Text>CheckoutScreen</Text>
    </MainLayout>
  );
};

export default CheckoutScreen;
