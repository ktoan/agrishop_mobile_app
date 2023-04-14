import React from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import AddressFlatListItem from '../../components/FlatListItem/AddressFlatListItem';
import Header from '../../components/Header';
import {addresses} from '../../constants/FakeData';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';

const AddressesScreen = ({navigation}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header title="My Addresses" backEnabled navigation={navigation} />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {addresses.map((item, index) => (
          <AddressFlatListItem
            key={item.id}
            data={item}
            isLast={item === addresses.length - 1}
          />
        ))}
        <Button
          text="Create new address"
          textStyle={{...Fonts.body4}}
          onPress={() => navigation.navigate('AddAddressScreen')}
        />
      </View>
    </MainLayout>
  );
};

export default AddressesScreen;
