import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import FilterModal from '../../components/FilterModal';
import CategoryFlatListItem from '../../components/FlatListItem/CategoryFlatListItem';
import ProductFlatListItem from '../../components/FlatListItem/ProductFlatListItem';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {fetchProductsCategory} from '../../redux/actions/productActions';
import {updateUserCart} from '../../redux/actions/cartActions';

const HomeScreen = ({
  navigation,
  productsByCategory,
  categories,
  user,
  products,
  fetchProductsCategory,
  updateUserCart,
}) => {
  const dispatch = useDispatch();

  const [selectedCategoryCode, setSelectedCategoryCode] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
        }}>
        <View>
          <Text
            style={{...Fonts.h4, marginBottom: Sizes.space1, width: '90%'}}
            numberOfLines={1}>
            Hello, {user.fullName}
          </Text>
          <Text>What do you wanna buy for today?</Text>
        </View>
        <RenderPNG
          size={60}
          imageSource={{
            uri: user.avatar,
          }}
          style={{borderRadius: 30}}
        />
      </View>
    );
  };

  function handleViewProductDetails(product) {
    navigation.navigate('Product', {
      screen: 'ProductDetailsScreen',
      params: {
        product: product,
      },
    });
  }

  return (
    <MainLayout renderHeader={renderHeader}>
      <View>
        {/* Search input */}
        <View
          style={{
            paddingHorizontal: Sizes.space4,
            paddingVertical: Sizes.space3,
          }}>
          <Input
            renderLeftIcon={() => <RenderPNG imageSource={Images.search} />}
            placeholder="Search keywords..."
            renderRightIcon={() => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowFilterModal(true);
                }}>
                <RenderPNG imageSource={Images.filter} />
              </TouchableOpacity>
            )}
          />
        </View>
        {showFilterModal && (
          <FilterModal
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
          />
        )}
        {/* List products by category */}
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          {/* Render list categories */}
          <FlatList
            data={[{code: 'all', name: 'All Categories'}, ...categories]}
            horizontal
            keyExtractor={item => `CategoryFlatListItemCard-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CategoryFlatListItem
                onPress={() => {
                  setSelectedCategoryCode(item.code);
                  fetchProductsCategory(dispatch, products, item.code);
                }}
                isActive={selectedCategoryCode === item.code}
                data={item}
                isLast={index === categories.length}
              />
            )}
          />
          {/* Render products fetched by selected category */}
          <View style={{paddingVertical: Sizes.space3}}>
            {productsByCategory.length === 0 ? (
              <Text
                style={{
                  ...Fonts.body4,
                  color: Colors.grey,
                  textAlign: 'center',
                }}>
                Have no products contains this category to showing!
              </Text>
            ) : (
              productsByCategory.map((item, index) => (
                <ProductFlatListItem
                  onPress={() => handleViewProductDetails(item)}
                  key={`ProductFlatListCard-${item.id}`}
                  data={item}
                  isLast={index === productsByCategory.length - 1}
                  addToCart={() => updateUserCart(dispatch, item.id, 1)}
                />
              ))
            )}
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    productsByCategory: state.app.productsByCategory,
    categories: state.app.categories,
    products: state.app.products,
  };
};

const mapActionToProps = () => {
  return {
    fetchProductsCategory,
    updateUserCart,
  };
};

export default connect(mapStateToProps, mapActionToProps)(HomeScreen);
