import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostsScreen from './PostsScreen';
import PostDetailsScreen from './PostDetailsScreen';

const PostStack = createNativeStackNavigator();

const Post = () => {
  return (
    <PostStack.Navigator screenOptions={{headerShown: false}}>
      <PostStack.Screen name="PostsScreen" component={PostsScreen} />
      <PostStack.Screen
        name="PostDetailsScreen"
        component={PostDetailsScreen}
      />
    </PostStack.Navigator>
  );
};

export default Post;
