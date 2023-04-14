import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import Shadow from '../../constants/Shadow';

const ProfileLinkFlatListItem = ({data, isLast, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        borderRadius: 10,
        backgroundColor: Colors.white,
        ...Shadow,
        marginBottom: isLast ? 0 : Sizes.space3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RenderPNG imageSource={data.image} size={30} />
      </View>
      <Text
        style={{
          flex: 1,
          marginLeft: Sizes.space3,
          width: '90%',
          ...Fonts.body4,
          color: data.logout ? Colors.red : Colors.primary,
        }}
        numberOfLines={1}>
        {data.label}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileLinkFlatListItem;
