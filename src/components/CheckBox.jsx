import {View, Text} from 'react-native';
import React from 'react';
import RenderPNG from './RenderPNG';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native';

const CheckBox = ({isChecked, onPress = () => {}}) => {
  const activeStyle = {
    backgroundColor: Colors.light,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          padding: 5,
          borderWidth: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Colors.grey,
          borderRadius: 5,
        },
        isChecked && activeStyle,
      ]}>
      {isChecked ? (
        <RenderPNG imageSource={Images.done_status} size={18} />
      ) : (
        <View style={{width: 18, height: 18}}></View>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
