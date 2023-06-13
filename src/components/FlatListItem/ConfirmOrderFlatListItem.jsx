import {View, Text} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import Shadow from '../../constants/Shadow';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';

const ConfirmOrderFlatListItem = ({data, isLast}) => {
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        backgroundColor: Colors.white,
        ...Shadow,
        marginBottom: isLast ? 0 : Sizes.space3,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <RenderPNG
        imageSource={{uri: data.product.images[0].url}}
        size={100}
        style={{borderRadius: 10}}
      />
      <View
        style={{
          marginLeft: Sizes.space3,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.h4}}>{data.product.name}</Text>
          <Text style={{...Fonts.body4, color: Colors.black}}>
            ${data.product.price} x {data.quantity}
          </Text>
        </View>
        <View
          style={{
            marginLeft: Sizes.space3,
          }}>
          <Text style={{...Fonts.h4}}>
            ${data.product.price * data.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmOrderFlatListItem;
