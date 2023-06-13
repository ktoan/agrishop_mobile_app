import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';
import OrderFlatListItem from '../../components/FlatListItem/OrderFlatListItem';
import Colors from '../../constants/Colors';

const OrdersScreen = ({navigation}) => {
  const {orders} = useSelector(state => state.cart);
  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Orders" backEnabled navigation={navigation} />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {orders.map((item, index) => (
          <OrderFlatListItem
            onPress={() => {
              if (item.orderStatus === 'HAVE_DONE') {
                navigation.navigate('LeaveReviewScreen', {
                  data: item,
                });
              } else {
                return;
              }
            }}
            key={index}
            data={item}
          />
        ))}
      </View>
    </MainLayout>
  );
};

export default OrdersScreen;
