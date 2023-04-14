import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';

export default function Button({
  text = 'Button',
  bgColor = Colors.primary,
  bdColor = Colors.primary,
  fgColor = Colors.white,
  textStyle = Fonts.body1,
  onPress = () => {},
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        width: '100%',
        height: 70,
        borderWidth: 1,
        borderColor: bdColor,
        backgroundColor: bgColor,
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        ...style,
      }}>
      <Text style={{...textStyle, color: fgColor, fontWeight: 'bold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
