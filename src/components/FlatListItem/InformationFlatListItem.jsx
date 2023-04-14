import {View, Text} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import Shadow from '../../constants/Shadow';
import Fonts from '../../constants/Fonts';

const InformationFlatListItem = ({label, value, style}) => {
  return (
    <>
      <View
        style={{
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
          backgroundColor: Colors.white,
          borderRadius: 10,
          ...Shadow,
          ...style,
        }}>
        <Text style={{...Fonts.body6, color: Colors.grey}}>{label}</Text>
        <Text style={{...Fonts.h4}}>{value}</Text>
      </View>
    </>
  );
};

export default InformationFlatListItem;
