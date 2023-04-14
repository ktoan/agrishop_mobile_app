import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Shadow from '../../constants/Shadow';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import RenderPNG from '../RenderPNG';
import Images from '../../constants/Images';

const AddressFlatListItem = ({data, isLast}) => {
  const ActiveButton = ({imageSource, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{marginBottom: Sizes.space3}}>
        <RenderPNG imageSource={imageSource} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        ...Shadow,
        backgroundColor: Colors.white,
        marginBottom: isLast ? 0 : Sizes.space3,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View style={{flex: 1, marginRight: Sizes.space3}}>
        <Text style={{...Fonts.h4}}>{data.street}</Text>
        <Text style={{...Fonts.body5, color: Colors.grey}}>
          {data.district}
        </Text>
        <Text style={{...Fonts.body5, color: Colors.grey}}>{data.state}</Text>
        <Text style={{...Fonts.body5, color: Colors.grey}}>{data.country}</Text>
      </View>
      <View>
        <ActiveButton imageSource={Images.edit} />
        <ActiveButton imageSource={Images.delete} />
      </View>
    </View>
  );
};

export default AddressFlatListItem;
