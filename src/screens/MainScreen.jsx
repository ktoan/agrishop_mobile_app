import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import TabIcon from '../components/TabIcon';
import Images from '../constants/Images';
import Home from '../screens/Home/Home';
import Cart from './Cart/Cart';
import Post from './Post/Post';
import Product from './Product/Product';
import Account from './User/Account';
import {fetchProducts} from '../redux/actions/productActions';
import {setAuthToken} from '../utils/SetAuthToken';
import {fetchCategories} from '../redux/actions/categoryActions';
import {fetchUserAddresses} from '../redux/actions/addressActions';
import {fetchUserCart, fetchUserOrders} from '../redux/actions/cartActions';
import {fetchPosts} from '../redux/actions/postActions';

const MainBottomTabs = createBottomTabNavigator();

const MainScreen = ({
  token,
  fetchProducts,
  fetchCategories,
  fetchUserAddresses,
  fetchUserCart,
  fetchPosts,
  user,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(token);
    fetchProducts(dispatch);
    fetchPosts(dispatch);
    fetchCategories(dispatch);
    fetchUserAddresses(dispatch, user.id);
    fetchUserCart(dispatch);
    fetchUserOrders(dispatch);
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
  return {token: state.auth.token, user: state.auth.user};
};

const mapActionToProps = () => {
  return {
    fetchProducts,
    fetchCategories,
    fetchUserAddresses,
    fetchUserCart,
    fetchPosts,
  };
};

export default connect(mapStateToProps, mapActionToProps)(MainScreen);
