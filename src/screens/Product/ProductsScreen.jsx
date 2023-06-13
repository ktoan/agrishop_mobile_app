import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import FilterProductModal from '../../components/FilterProductModal';
import ProductFlatListItem from '../../components/FlatListItem/ProductFlatListItem';
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
import {changeFilters} from '../../redux/actions/productActions';
import {fetchProductByFilters} from '../../utils/ProductHandling';

const ProductsScreen = ({navigation, products, filters, changeFilters}) => {
  const dispatch = useDispatch();
  const [showFilterProductModal, setShowFilterProductModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [renderedProducts, setRenderedProducts] = useState(products);

  function onChangeKeywordField(value) {
    let val = value;
    setKeyword(val);
    changeFilters(dispatch, {nameLiked: val});
  }

  const renderHeader = () => {
    return (
      <>
        <Header title="Products" />
        <View
          style={{
            paddingTop: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          {/* Search input */}
          <Input
            value={keyword}
            onChangeText={value => onChangeKeywordField(value)}
            style={{marginBottom: Sizes.space3}}
            renderLeftIcon={() => <RenderPNG imageSource={Images.search} />}
            placeholder="Search keywords..."
            renderRightIcon={() => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowFilterProductModal(true);
                }}>
                <RenderPNG imageSource={Images.filter} />
              </TouchableOpacity>
            )}
          />
        </View>
      </>
    );
  };

  const renderFiltersProduct = () => {
    return fetchProductByFilters(renderedProducts, filters).length === 0 ? (
      <Text
        style={{
          ...Fonts.body4,
          color: Colors.grey,
          textAlign: 'center',
        }}>
        Have no products contains this category to showing!
      </Text>
    ) : (
      fetchProductByFilters(renderedProducts, filters).map((item, index) => (
        <ProductFlatListItem
          isLast={
            index ===
            fetchProductByFilters(renderedProducts, filters).length - 1
          }
          key={item.id}
          data={item}
          onPress={() =>
            navigation.navigate('ProductDetailsScreen', {
              productId: item.id,
            })
          }
          addToCart={() =>
            updateUserCart(dispatch, {
              productId: item.id,
              quantity: 1,
            })
          }
        />
      ))
    );
  };

  return (
    <MainLayout renderHeader={renderHeader}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {showFilterProductModal && (
          <FilterProductModal
            isVisible={showFilterProductModal}
            onClose={() => setShowFilterProductModal(false)}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {fetchProductByFilters(renderedProducts, filters).length > 0 && (
            <Text
              style={{
                ...Fonts.h4,
                color: Colors.primary,
                marginBottom: Sizes.space3,
                textAlign: 'center',
                width: '100%',
              }}>
              It has {fetchProductByFilters(renderedProducts, filters).length}{' '}
              to showing for you!
            </Text>
          )}
          <LineDivider />
          <View style={{marginTop: Sizes.space3, width: '100%'}}>
            {renderFiltersProduct()}
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    products: state.product.products,
    filters: state.product.filters,
  };
};

const mapActionToProps = () => {
  return {
    updateUserCart,
    changeFilters,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProductsScreen);
