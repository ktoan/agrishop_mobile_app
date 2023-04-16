import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import Shadow from '../../constants/Shadow';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';

const CartFlatListItem = ({data, isLast, deleteCartItem = () => {}}) => {
  const ActionQuantityButton = ({imageSource, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          padding: Sizes.space1,
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 10,
        }}>
        <RenderPNG imageSource={imageSource} size={20} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        backgroundColor: Colors.white,
        ...Shadow,
        marginBottom: isLast ? 0 : Sizes.space3,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <RenderPNG
        imageSource={{uri: data.product.images[0].url}}
        size={100}
        style={{borderRadius: 10}}
      />
      <View style={{flex: 1, marginLeft: Sizes.space3}}>
        <Text style={{...Fonts.h4, width: '90%'}} numberOfLines={1}>
          {data.product.name}
        </Text>
        <Text
          style={{
            ...Fonts.body4,
            color: Colors.grey,
            marginBottom: Sizes.space3,
          }}>
          {data.quantity} x {data.product.price}$
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ActionQuantityButton imageSource={Images.subtract} />
          <Text style={{...Fonts.h3, marginHorizontal: Sizes.space3}}>
            {data.quantity}
          </Text>
          <ActionQuantityButton imageSource={Images.plus} />
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={deleteCartItem}>
        <RenderPNG imageSource={Images.delete} />
      </TouchableOpacity>
    </View>
  );
};

export default CartFlatListItem;
