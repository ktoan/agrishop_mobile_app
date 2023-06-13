import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import Fonts from '../../constants/Fonts';
import PostFlatListItem from '../../components/FlatListItem/PostFlatListItem';

const PostsScreen = ({navigation, posts}) => {
  const renderHeader = () => {
    return (
      <>
        <Header title="Posts" />
        <View
          style={{
            paddingTop: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          {/* Search input */}
          <Input
            style={{marginBottom: Sizes.space3}}
            renderLeftIcon={() => <RenderPNG imageSource={Images.search} />}
            placeholder="Search keywords..."
            renderRightIcon={() => (
              <TouchableOpacity activeOpacity={0.7}>
                <RenderPNG imageSource={Images.filter} />
              </TouchableOpacity>
            )}
          />
        </View>
      </>
    );
  };

  return (
    <MainLayout renderHeader={renderHeader}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {posts.length === 0 ? (
            <Text style={{...Fonts.h4}}>Have no posts to showing</Text>
          ) : (
            posts.map((item, index) => (
              <PostFlatListItem
                data={item}
                key={index}
                isLast={index === posts.length - 1}
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
    posts: state.post.posts,
  };
};

const mapActionToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapActionToProps)(PostsScreen);
