import React from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import CartFlatListItem from '../../components/FlatListItem/CartFlatListItem';
import Header from '../../components/Header';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {deleteUserCart, updateUserCart} from '../../redux/actions/cartActions';
import {useState} from 'react';
import {calculateListCartOrOrderPrice} from '../../utils/ProductHandling';
import {Text} from 'react-native';
import Colors from '../../constants/Colors';

const ListCartScreen = ({navigation, cart, deleteUserCart}) => {
  const dispatch = useDispatch();

  const [checkedList, setCheckList] = useState([]);

  function onCheckCartItem(data) {
    const newList = [...checkedList];
    newList.push(data);
    setCheckList(newList);
  }

  function onUncheckCartItem(data) {
    const newList = [...checkedList];
    let removeIndex = newList.findIndex(item => item.id === data.id);
    newList.splice(removeIndex, 1);
    setCheckList(newList);
  }

  const {subTotal, total, saleOff} = calculateListCartOrOrderPrice(cart);

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
            onCheckCartItem={() => onCheckCartItem(item)}
            onUncheckCartItem={() => onUncheckCartItem(item)}
            deleteCartItem={() => deleteUserCart(dispatch, item.id)}
          />
        ))}
      </View>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
          backgroundColor: Colors.primary,
        }}>
        <Text style={{...Fonts.body4, color: Colors.white}}>
          Subtotal: ${subTotal}
        </Text>
        <Text style={{...Fonts.body4, color: Colors.white}}>
          Sale: ${saleOff}
        </Text>
        <Text style={{...Fonts.body4, color: Colors.white}}>
          Total: ${total}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Button
          onPress={() => {
            if (checkedList.length === 0) return;
            navigation.navigate('CheckoutScreen', {
              orderItems: checkedList,
            });
          }}
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
  return {cart: state.cart.cart};
};

const mapActionToProps = () => {
  return {deleteUserCart};
};

export default connect(mapStateToProps, mapActionToProps)(ListCartScreen);
