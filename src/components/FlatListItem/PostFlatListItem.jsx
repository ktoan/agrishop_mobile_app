import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Shadow from '../../constants/Shadow';
import Colors from '../../constants/Colors';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import {convertSQLDateTimeToDateTimeString} from '../../utils/StringUtils';

const PostFlatListItem = ({data = null, isLast = true}) => {
  return (
    data && (
      <View
        style={{
          width: '100%',
          borderRadius: 10,
          ...Shadow,
          backgroundColor: Colors.white,
          marginBottom: isLast ? 0 : Sizes.space3,
        }}>
        {/* Render post image */}
        <TouchableOpacity activeOpacity={0.7}>
          <RenderPNG
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            imageSource={{uri: data.image.url}}
          />
        </TouchableOpacity>
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          <Text
            style={{...Fonts.h4, width: '90%', marginBottom: Sizes.space3}}
            numberOfLines={1}>
            {data.title}
          </Text>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
              marginBottom: Sizes.space3,
            }}
            numberOfLines={3}>
            {data.shortDescription}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: Sizes.space3,
              alignItems: 'center',
            }}>
            <Text style={{...Fonts.h4, color: Colors.primary}}>Author: </Text>
            <Text
              style={{...Fonts.h4, fontWeight: 'normal', color: Colors.grey}}>
              {data.author.fullName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: Sizes.space3,
              alignItems: 'center',
            }}>
            <Text style={{...Fonts.h4, color: Colors.primary}}>
              Created Date:{' '}
            </Text>
            <Text
              style={{
                ...Fonts.h4,
                fontWeight: 'normal',
                color: Colors.grey,
              }}
              numberOfLines={1}>
              {convertSQLDateTimeToDateTimeString(data.createdDate)}
            </Text>
          </View>
        </View>
      </View>
    )
  );
};

export default PostFlatListItem;

const styles = StyleSheet.create({});
