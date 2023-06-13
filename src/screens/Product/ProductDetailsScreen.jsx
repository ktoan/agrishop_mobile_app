import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import ReviewFlatListItem from '../../components/FlatListItem/ReviewFlatListItem';
import Header from '../../components/Header';
import Input from '../../components/Input';
import LineDivider from '../../components/LineDivider';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {updateUserCart} from '../../redux/actions/cartActions';
import {
  addReviewToProduct,
  fetchProductDetails,
  setCurrentViewedProductId,
} from '../../redux/actions/productActions';
import {calculateProductStar} from '../../utils/ProductHandling';
import {showErrorToast} from '../../utils/ToastActions';
import {selectedProduct} from '../../constants/FakeData';

const ProductDetailsScreen = ({navigation, route, updateUserCart}) => {
  const dispatch = useDispatch();
  const {productId} = route.params;

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [noShowedReviews, setNoShowedReviews] = useState(2);

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

  useEffect(() => {
    function next(data) {
      setProduct(data);
    }
    function errorHandle(message) {}
    fetchProductDetails(productId, next, errorHandle);
  }, [productId]);

  return (
    product && (
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
            {product.images.map(image => (
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
          {/* Render product name  */}
          <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
            {product.name}
          </Text>
          {/* Render product rate  */}
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
          {/* Render product short description  */}
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
          {/* Change quantity to add cart  */}
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
          {/* Add cart button  */}
          <View
            style={{
              paddingVertical: Sizes.space3,
            }}>
            <Button
              textStyle={{...Fonts.body4}}
              text="Add to cart"
              onPress={() => {
                updateUserCart(dispatch, {
                  productId: product.id,
                  quantity,
                });
                setQuantity(1);
              }}
            />
          </View>
        </View>
        <LineDivider />
        {/* Reviews  */}
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>Reviews</Text>
          {/* List comment  */}
          <View style={{marginBottom: Sizes.space3}}>
            {product.reviews.slice(0, noShowedReviews).map(review => (
              <ReviewFlatListItem key={review.id} data={review} />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setNoShowedReviews(prev => prev + 2);
              }}>
              <Text
                style={{...Fonts.h4, color: Colors.grey, textAlign: 'center'}}>
                Load more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainLayout>
    )
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {
    updateUserCart,
    addReviewToProduct,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProductDetailsScreen);
