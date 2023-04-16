import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import Button from '../Button';
import {Rating} from 'react-native-ratings';
import RenderPNG from '../RenderPNG';
import Shadow from '../../constants/Shadow';
import {calculateProductStar} from '../../utils/ProductHandling';

const ProductWrapCardItem = ({
  data,
  onNavigationPress = () => {},
  addToCart = () => {},
}) => {
  return (
    <View
      activeOpacity={0.7}
      style={{
        width: (Sizes.width - Sizes.space4 * 2 - Sizes.space3) / 2,
        backgroundColor: Colors.white,
        marginBottom: Sizes.space3,
        borderRadius: 10,
        ...Shadow,
      }}>
      <TouchableOpacity onPress={onNavigationPress}>
        <RenderPNG
          imageSource={{uri: data.images[0].url}}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: '100%',
            height: 100,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Text style={{...Fonts.h5}} numberOfLines={1}>
          {data.name}
        </Text>
        <Rating
          startingValue={calculateProductStar(data)}
          style={{width: '100%', marginVertical: Sizes.space3}}
          imageSize={18}
        />
        <View
          style={{
            marginBottom: Sizes.space3,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...Fonts.h4,
              flex: 1,
            }}
            numberOfLines={1}>
            ${data.price}
          </Text>
        </View>
        <Text
          style={{
            ...Fonts.body6,
            color: Colors.grey,
            paddingLeft: Sizes.space3,
            borderLeftWidth: 5,
            borderLeftColor: Colors.primary,
            marginBottom: Sizes.space3,
          }}
          numberOfLines={3}>
          {data.shortDescription}
        </Text>
        <Button
          text="Add to cart"
          textStyle={{...Fonts.body6}}
          onPress={addToCart}
        />
      </View>
    </View>
  );
};

export default ProductWrapCardItem;
