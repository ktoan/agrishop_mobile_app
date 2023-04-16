import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import TabIcon from '../components/TabIcon';
import Images from '../constants/Images';
import {fetchCategories} from '../redux/actions/categoryActions';
import {fetchProducts} from '../redux/actions/productActions';
import {fetchAddresses} from '../redux/actions/userActions';
import Home from '../screens/Home/Home';
import Cart from './Cart/Cart';
import Post from './Post/Post';
import Product from './Product/Product';
import Account from './User/Account';
import axios from 'axios';
import {fetchCart} from '../redux/actions/cartActions';
import {setAuthToken} from '../utils/SetAuthToken';

const MainBottomTabs = createBottomTabNavigator();

const MainScreen = ({
  fetchCategories,
  fetchProducts,
  fetchAddresses,
  fetchCart,
  token,
  user,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(token);
    fetchCategories(dispatch);
    fetchProducts(dispatch);
    fetchAddresses(dispatch, user.id);
    fetchCart(dispatch);
  }, []);

  return (
    <MainBottomTabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 100,
        },
        tabBarShowLabel: false,
      }}>
      <MainBottomTabs.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              activeImageSource={Images.homeFilled}
              defaultImageSource={Images.home}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Home', {screen: 'HomeScreen'});
          },
        })}
      />
      <MainBottomTabs.Screen
        name={'Account'}
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              activeImageSource={Images.userFilled}
              defaultImageSource={Images.user}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Account', {screen: 'ProfileScreen'});
          },
        })}
      />
      <MainBottomTabs.Screen
        name={'Product'}
        component={Product}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              activeImageSource={Images.productFilled}
              defaultImageSource={Images.product}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Product', {screen: 'ProductsScreen'});
          },
        })}
      />
      <MainBottomTabs.Screen
        name={'Post'}
        component={Post}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              activeImageSource={Images.blogFilled}
              defaultImageSource={Images.blog}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Post', {screen: 'PostsScreen'});
          },
        })}
      />
      <MainBottomTabs.Screen
        name={'Cart'}
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              activeImageSource={Images.cartFilled}
              defaultImageSource={Images.cart}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Cart', {screen: 'ListCartScreen'});
          },
        })}
      />
    </MainBottomTabs.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.access_token,
  };
};

const mapActionToProps = () => {
  return {fetchCategories, fetchProducts, fetchAddresses, fetchCart};
};

export default connect(mapStateToProps, mapActionToProps)(MainScreen);
