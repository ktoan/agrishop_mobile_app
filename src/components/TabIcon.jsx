import {View, Text} from 'react-native';
import React from 'react';
import RenderPNG from './RenderPNG';
import Colors from '../constants/Colors';

const TabIcon = ({focused, activeImageSource, defaultImageSource}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 80,
      }}>
      <RenderPNG
        imageSource={focused ? activeImageSource : defaultImageSource}
      />
      {focused && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Colors.primary,
          }}></View>
      )}
    </View>
  );
};

export default TabIcon;
