import React from 'react';
import {View} from 'react-native';
import ProductWrapCardItem from '../../components/FlatListItem/ProductWrapCardItem';
import Header from '../../components/Header';
import {products} from '../../constants/FakeData';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {updateUserCart} from '../../redux/actions/cartActions';
import {connect, useDispatch} from 'react-redux';

const ProductsScreen = ({navigation, updateUserCart}) => {
  const dispatch = useDispatch();

  return (
    <MainLayout renderHeader={() => <Header title="Products" />}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {products.map(item => (
            <ProductWrapCardItem
              key={item.id}
              data={item}
              onNavigationPress={() =>
                navigation.navigate('ProductDetailsScreen', {
                  product: item,
                })
              }
              addToCart={() => updateUserCart(dispatch, item.id, 1)}
            />
          ))}
        </View>
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {
    updateUserCart,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProductsScreen);
