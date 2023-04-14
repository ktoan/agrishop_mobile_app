import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Sizes from '../constants/Sizes';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('WalkThroughScreen');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.logo}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text style={{marginTop: Sizes.space3, ...Fonts.h1}}>Welcome to</Text>
        <Text style={{marginTop: Sizes.space3, ...Fonts.h1}}>AgriShop</Text>
      </View>
      <View
        style={{
          paddingHorizontal: Sizes.space4,
          marginBottom: Sizes.space6,
        }}></View>
    </View>
  );
};

export default WelcomeScreen;
