import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import CategoryFlatListItem from '../../components/FlatListItem/CategoryFlatListItem';
import ProductFlatListItem from '../../components/FlatListItem/ProductFlatListItem';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {updateUserCart} from '../../redux/actions/cartActions';
import {fetchProductsByCategory} from '../../utils/ProductHandling';
import PostFlatListItem from '../../components/FlatListItem/PostFlatListItem';
import LineDivider from '../../components/LineDivider';

const HomeScreen = ({
  navigation,
  products,
  categories,
  updateUserCart,
  user,
  posts,
}) => {
  const dispatch = useDispatch();

  const [selectedCategoryCode, setSelectedCategoryCode] = useState('all');

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
          style={{borderRadius: 30, borderWidth: 0.3, borderColor: Colors.grey}}
        />
      </View>
    );
  };

  function handleViewProductDetails(product) {
    navigation.navigate('Product', {
      screen: 'ProductDetailsScreen',
      params: {
        productId: product.id,
      },
    });
  }

  return (
    <MainLayout renderHeader={renderHeader}>
      <View>
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
                }}
                isActive={selectedCategoryCode === item.code}
                data={item}
                isLast={index === categories.length}
              />
            )}
          />
          {/* Render products fetched by selected category */}
          <View style={{paddingVertical: Sizes.space3}}>
            {fetchProductsByCategory(products, selectedCategoryCode).length ===
            0 ? (
              <Text
                style={{
                  ...Fonts.body4,
                  color: Colors.grey,
                  textAlign: 'center',
                }}>
                Have no products contains this category to showing!
              </Text>
            ) : (
              fetchProductsByCategory(products, selectedCategoryCode).map(
                (item, index) => (
                  <ProductFlatListItem
                    onPress={() => handleViewProductDetails(item)}
                    key={`ProductFlatListCard-${item.id}`}
                    data={item}
                    isLast={index === products.length - 1}
                    addToCart={() =>
                      updateUserCart(dispatch, {
                        productId: item.id,
                        quantity: 1,
                      })
                    }
                  />
                ),
              )
            )}
          </View>
        </View>
        <LineDivider />
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          <Text style={{marginBottom: Sizes.space3, ...Fonts.h3}}>
            Latest Blogs
          </Text>
          {/* List 4 lasted posts */}
          {posts.length === 0 ? (
            <Text
              style={{
                ...Fonts.body4,
                color: Colors.grey,
                textAlign: 'center',
              }}>
              Have no posts to showing
            </Text>
          ) : (
            posts
              .slice(0, 4)
              .map((item, index) => (
                <PostFlatListItem
                  data={item}
                  key={index}
                  isLast={index === 3}
                />
              ))
          )}
        </View>
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    products: state.product.products,
    categories: state.category.categories,
    posts: state.post.posts,
  };
};

const mapActionToProps = () => {
  return {updateUserCart};
};

export default connect(mapStateToProps, mapActionToProps)(HomeScreen);
