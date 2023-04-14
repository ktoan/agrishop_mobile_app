import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Swiper from 'react-native-swiper';
import {products} from '../../constants/FakeData';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import {Rating} from 'react-native-ratings';
import {calculateProductStar} from '../../utils/ProductHandling';
import Images from '../../constants/Images';
import {useState} from 'react';
import Button from '../../components/Button';

const ProductDetailsScreen = ({navigation, route}) => {
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);
  const ActionButton = ({imageSource, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <RenderPNG imageSource={imageSource} size={18} />
      </TouchableOpacity>
    );
  };
  function handleChangeQuantity(dir) {
    if (dir === 'minus') {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }
  return (
    <MainLayout
      renderHeader={() => (
        <Header title={product.name} backEnabled navigation={navigation} />
      )}>
      {/* Render product images  */}
      <View style={{width: '100%', height: 200}}>
        <Swiper
          paginationStyle={{position: 'absolute', bottom: '10%'}}
          activeDotColor={Colors.white}
          dotColor={Colors.grey}>
          {product.images.map((image, index) => (
            <View key={image.id}>
              <RenderPNG
                imageSource={{uri: image.url}}
                style={{width: '100%', height: 200}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  width: '100%',
                  height: 200,
                  backgroundColor: Colors.lightOverlay,
                }}></View>
            </View>
          ))}
        </Swiper>
      </View>
      {/* Render content  */}
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
          {product.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Sizes.space3,
          }}>
          <Rating
            style={{alignItems: 'flex-start'}}
            startingValue={calculateProductStar(product)}
            imageSize={20}
            readonly
            ratingColor={Colors.yellow}
          />
          <Text
            style={{
              flex: 1,
              ...Fonts.body4,
              color: Colors.yellow,
              marginLeft: Sizes.space1,
            }}>
            with {product.reviews.length} review(s)
          </Text>
        </View>
        <Text
          style={{
            ...Fonts.body5,
            color: Colors.grey,
            paddingLeft: Sizes.space3,
            borderLeftWidth: 5,
            borderLeftColor: Colors.primary,
            marginBottom: Sizes.space3,
          }}>
          {product.shortDescription}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.light,
              paddingVertical: Sizes.space1,
              paddingHorizontal: Sizes.space4,
              borderRadius: 10,
            }}>
            <ActionButton
              imageSource={Images.subtract}
              onPress={() => handleChangeQuantity('minus')}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <Text style={{...Fonts.h3, marginHorizontal: Sizes.space3}}>
                {quantity}
              </Text>
            </View>
            <ActionButton
              imageSource={Images.plus}
              onPress={() => handleChangeQuantity('plus')}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: Sizes.space3,
          }}>
          <Button textStyle={{...Fonts.body4}} text="Add to cart" />
        </View>
      </View>
    </MainLayout>
  );
};

export default ProductDetailsScreen;
