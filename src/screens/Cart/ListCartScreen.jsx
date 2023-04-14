import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/Header';
import MainLayout from '../../layouts/MainLayout';
import Sizes from '../../constants/Sizes';
import {cart} from '../../constants/FakeData';
import CartFlatListItem from '../../components/FlatListItem/CartFlatListItem';
import Button from '../../components/Button';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const ListCartScreen = ({navigation}) => {
  return (
    <MainLayout renderHeader={() => <Header title="My Cart" />}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {cart.map((item, index) => (
          <CartFlatListItem
            key={item.id}
            data={item}
            isLast={index === cart.length - 1}
          />
        ))}
      </View>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Button
          onPress={() => navigation.navigate('CheckoutScreen')}
          text="Checkout"
          textStyle={{
            ...Fonts.body4,
          }}
          style={{marginBottom: Sizes.space3}}
        />
        <Button
          bgColor={Colors.white}
          fgColor={Colors.primary}
          bdColor={Colors.white}
          text="Update your cart"
          textStyle={{
            ...Fonts.body4,
          }}
        />
      </View>
    </MainLayout>
  );
};

export default ListCartScreen;
