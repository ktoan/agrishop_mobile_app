import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Fonts from '../../constants/Fonts';
import RenderPNG from '../../components/RenderPNG';
import Images from '../../constants/Images';

const AddAddressScreen = ({navigation}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header
          title="Create new address"
          backEnabled
          navigation={navigation}
        />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Input
          placeholder="Street"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.street} />}
        />
        <Input
          placeholder="District"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.district} />}
        />
        <Input
          placeholder="State"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.city} />}
        />
        <Input
          placeholder="Country"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.country} />}
        />
        <Button text="Create" textStyle={{...Fonts.body4}} />
      </View>
    </MainLayout>
  );
};

export default AddAddressScreen;
