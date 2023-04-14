import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Shadow from '../../constants/Shadow';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import {calculateProductStar} from '../../utils/ProductHandling';
import Button from '../../components/Button';

const ProductFlatListItem = ({data, isLast, onPress = () => {}}) => {
  const renderSaleOff = () => {
    return data.saleOff ? (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
          backgroundColor: Colors.primary,
        }}>
        <Text style={{...Fonts.h5, color: Colors.white}}>{data.saleOff}%</Text>
      </View>
    ) : (
      <></>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        borderRadius: 10,
        ...Shadow,
        backgroundColor: Colors.white,
        marginBottom: isLast ? 0 : Sizes.space3,
      }}>
      {/* Render product image */}
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <RenderPNG
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          imageSource={{uri: data.images[0].url}}
        />
      </TouchableOpacity>
      {/* Content : Name, shortDescription,... */}
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {/* Product name  */}
        <Text
          style={{...Fonts.h4, width: '90%', marginBottom: Sizes.space3}}
          numberOfLines={1}>
          {data.name}
        </Text>
        {/* Product rate */}
        <View
          style={{
            marginBottom: Sizes.space3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RenderPNG imageSource={Images.star} size={15} />
            <Text
              style={{
                ...Fonts.body4,
                color: Colors.yellow,
                marginLeft: Sizes.space1,
              }}>
              {calculateProductStar(data)}
            </Text>
          </View>
        </View>
        {/* Product Short Description  */}
        <Text style={{...Fonts.body4, color: Colors.grey}} numberOfLines={2}>
          {data.shortDescription}
        </Text>
      </View>
      {/* Render Sale off  */}
      {renderSaleOff()}
      <Button text="Add to cart" textStyle={{...Fonts.h5}} />
    </View>
  );
};

export default ProductFlatListItem;
