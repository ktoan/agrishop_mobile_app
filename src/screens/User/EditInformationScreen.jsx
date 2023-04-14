import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Images from '../../constants/Images';
import Button from '../../components/Button';
import Fonts from '../../constants/Fonts';
import DateInput from '../../components/DateInput';
import SelectDropdown from '../../components/SelectDropdown';

const EditInformationScreen = ({navigation}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Edit Information" backEnabled navigation={navigation} />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Input
          placeholder="Email"
          editable={false}
          value={'Nguyen Khanh Toan'}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        />
        <Input
          placeholder="Full Name"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.name} />}
        />
        <Input
          placeholder="Phone Number"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.phone} />}
        />
        <DateInput placeholder="Day Of Birth" />
        <SelectDropdown
          data={[
            {value: 'MALE', label: 'Male'},
            {value: 'FEMALE', label: 'Female'},
            {value: 'DISCLOSED', label: 'Disclosed'},
          ]}
          renderLeftIcon={() => <RenderPNG imageSource={Images.gender} />}
          placeholder={'Gender'}
        />
        <Button
          text="Confirm update information"
          textStyle={{...Fonts.body4}}
        />
      </View>
    </MainLayout>
  );
};

export default EditInformationScreen;
