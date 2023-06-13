import React from 'react';
import Header from '../../components/Header';
import {post} from '../../constants/FakeData';
import MainLayout from '../../layouts/MainLayout';
import RenderPNG from '../../components/RenderPNG';
import {View} from 'react-native';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import {Text} from 'react-native';
import RenderHtml from 'react-native-render-html';

const PostDetailsScreen = ({navigation, route}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header backEnabled navigation={navigation} title={post.title} />
      )}>
      <View style={{width: '100%', height: 200}}>
        <RenderPNG
          imageSource={{uri: post.image.url}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
          {post.title}
        </Text>
        <RenderHtml contentWidth={Sizes.width} source={{html: post.content}} />
      </View>
    </MainLayout>
  );
};

export default PostDetailsScreen;
