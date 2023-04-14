import React from 'react';
import {Image} from 'react-native';

export default function RenderPNG({imageSource, size, style}) {
  return (
    <Image
      source={imageSource}
      style={{width: size || 30, height: size || 30, ...style}}
    />
  );
}
