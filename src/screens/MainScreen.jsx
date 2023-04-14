import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Account from './User/Account';
import Product from './Product/Product';
import Post from './Post/Post';
import Cart from './Cart/Cart';
import TabIcon from '../components/TabIcon';
import Images from '../constants/Images';

const MainBottomTabs = createBottomTabNavigator();

const MainScreen = () => {
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

export default MainScreen;