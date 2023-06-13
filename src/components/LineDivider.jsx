import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const LineDivider = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 2,
        backgroundColor: Colors.primary,
      }}></View>
  );
};

export default LineDivider;
