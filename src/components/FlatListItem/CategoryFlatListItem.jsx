import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const CategoryFlatListItem = ({
  data,
  isActive = false,
  isLast = false,
  onPress = {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{marginRight: isLast ? 0 : Sizes.space3}}>
      <Text
        style={{
          ...Fonts.body4,
          color: isActive ? Colors.primary : Colors.grey,
        }}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryFlatListItem;
