import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import RenderPNG from '../components/RenderPNG';

const Header = ({
  title = 'Header',
  navigation,
  backEnabled = false,
  renderRightIcon = () => {},
}) => {
  const containerStyle =
    navigation && backEnabled
      ? {
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.light,
          justifyContent: 'space-between',
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }
      : {
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.light,
          justifyContent: 'center',
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        };

  return (
    <View style={containerStyle}>
      {navigation && backEnabled && (
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: Sizes.space1,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}>
          <RenderPNG imageSource={Images.back} size={18} />
        </TouchableOpacity>
      )}
      <Text style={{...Fonts.h3, textAlign: 'center'}} numberOfLines={1}>
        {title}
      </Text>
      {renderRightIcon()}
    </View>
  );
};

export default Header;
