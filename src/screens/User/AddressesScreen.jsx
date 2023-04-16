import React from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import AddressFlatListItem from '../../components/FlatListItem/AddressFlatListItem';
import Header from '../../components/Header';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {deleteUserAddress} from '../../redux/actions/userActions';

const AddressesScreen = ({navigation, addresses, deleteUserAddress}) => {
  const dispatch = useDispatch();

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
            isLast={index === addresses.length - 1}
            onEditPress={() =>
              navigation.navigate('EditAddressScreen', {address: item})
            }
            onDeletePress={() => deleteUserAddress(dispatch, item.id)}
          />
        ))}
        <View style={{paddingVertical: Sizes.space3}}>
          <Button
            text="Create new address"
            textStyle={{...Fonts.body4}}
            onPress={() => navigation.navigate('AddAddressScreen')}
          />
        </View>
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    addresses: state.app.addresses,
  };
};

const mapActionToProps = () => {
  return {deleteUserAddress};
};

export default connect(mapStateToProps, mapActionToProps)(AddressesScreen);
