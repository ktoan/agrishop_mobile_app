import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Shadow from '../../constants/Shadow';
import Colors from '../../constants/Colors';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import {calculateListCartOrOrderPrice} from '../../utils/ProductHandling';

const ConfirmProductsStep = ({products = []}) => {
  const {total} = calculateListCartOrOrderPrice(products);

  return (
    <>
      <View style={{paddingHorizontal: Sizes.space4}}>
        {products.map((item, index) => (
          <View
            key={index}
            style={{
              ...Shadow,
              paddingVertical: Sizes.space1,
              backgroundColor: Colors.white,
              marginBottom: index !== products.length - 1 ? Sizes.space3 : 0,
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <RenderPNG
              imageSource={{uri: item.product.images[0].url}}
              size={100}
            />
            <View style={{flex: 1, marginLeft: Sizes.space3}}>
              <Text style={{...Fonts.h4}}>{item.product.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...Fonts.body4, color: Colors.grey}}>
                  $
                  {item.product.saleOff === 0
                    ? item.product.price.toFixed(2)
                    : (
                        item.product.price -
                        (item.product.price * item.product.saleOff) / 100
                      ).toFixed(2)}
                </Text>
                <Text style={{...Fonts.body4, color: Colors.grey}}> x </Text>
                <Text style={{...Fonts.body4, color: Colors.grey}}>
                  {item.quantity}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
        }}>
        <Text style={{...Fonts.h4}}>Total: ${total}</Text>
      </View>
    </>
  );
};

export default ConfirmProductsStep;
