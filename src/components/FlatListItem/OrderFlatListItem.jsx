import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Shadow from '../../constants/Shadow';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import LineDivider from '../LineDivider';
import {calculateListCartOrOrderPrice} from '../../utils/ProductHandling';
import {convertSQLDateToStringDate} from '../../utils/StringUtils';

const OrderFlatListItem = ({data = null, onPress = () => {}}) => {
  return (
    data && (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          marginBottom: Sizes.space3,
          ...Shadow,
          borderRadius: 10,
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.h4}}>{data.id}</Text>
          <Text
            style={{
              ...Fonts.h4,
              color:
                data.orderStatus === 'CONFIRMING'
                  ? Colors.red
                  : data.orderStatus === 'SHIPPING'
                  ? Colors.yellow
                  : Colors.primary,
            }}>
            {data.orderStatus === 'CONFIRMING'
              ? 'Confirming'
              : data.orderStatus === 'SHIPPING'
              ? 'Shipping'
              : 'Have done'}
          </Text>
        </View>
        <LineDivider />
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{...Fonts.body5, color: Colors.grey}}>Products</Text>
            <View style={{flex: 1, marginLeft: Sizes.space3}}>
              {data.orderItems.map((item, index) => (
                <Text style={{...Fonts.body5}} numberOfLines={1} key={index}>
                  {item.product.name}
                </Text>
              ))}
            </View>
            <View>
              {data.orderItems.map((item, index) => (
                <Text
                  style={{...Fonts.body5, color: Colors.grey}}
                  numberOfLines={1}
                  key={index}>
                  x {item.quantity}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{...Fonts.body5, color: Colors.grey}}>Price: </Text>
            <Text style={{...Fonts.body5}}>
              ${calculateListCartOrOrderPrice(data.orderItems).total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{...Fonts.body5, color: Colors.grey}}>Address: </Text>
            <Text
              style={{flex: 1, marginLeft: Sizes.space3, ...Fonts.body5}}
              numberOfLines={1}>
              {`${data.address.street}, ${data.address.district}, ${data.address.state}, ${data.address.country}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{...Fonts.body5, color: Colors.grey}}>
              Created Date:
            </Text>
            <Text style={{...Fonts.body5}} numberOfLines={1}>
              {convertSQLDateToStringDate(data.createdDate)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default OrderFlatListItem;
