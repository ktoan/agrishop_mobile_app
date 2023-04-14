import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';

export default function Input({
  renderLeftIcon = () => {},
  renderRightIcon = () => {},
  password = false,
  style,
  textStyle,
  ...props
}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.light,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: Sizes.space4,
        paddingVertical: Sizes.space3,
        borderRadius: 10,
        ...style,
      }}>
      {renderLeftIcon()}
      <TextInput
        style={{
          flex: 1,
          paddingLeft: Sizes.space4,
          ...Fonts.body5,
          fontWeight: '600',
          ...textStyle,
        }}
        {...props}
      />
      {!password && renderRightIcon()}
    </View>
  );
}
