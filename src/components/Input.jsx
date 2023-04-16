import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';
import {useState} from 'react';
import RenderPNG from './RenderPNG';
import Images from '../constants/Images';

export default function Input({
  renderLeftIcon = () => {},
  renderRightIcon = () => {},
  password = false,
  style,
  textStyle,
  ...props
}) {
  const [hidePassword, setHidePassword] = useState(password);
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
        secureTextEntry={hidePassword}
      />
      {password ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setHidePassword(!hidePassword)}>
          <RenderPNG
            imageSource={hidePassword ? Images.eye : Images.blind}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        renderRightIcon()
      )}
    </View>
  );
}
