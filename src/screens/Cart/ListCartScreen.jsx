import React from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import CartFlatListItem from '../../components/FlatListItem/CartFlatListItem';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {deleteUserCart} from '../../redux/actions/cartActions';

const ListCartScreen = ({navigation, cart, deleteUserCart}) => {
  const dispatch = useDispatch();

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
            deleteCartItem={() => deleteUserCart(dispatch, item.id)}
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
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.app.cart,
  };
};

const mapActionToProps = () => {
  return {
    deleteUserCart,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ListCartScreen);
