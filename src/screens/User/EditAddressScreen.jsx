import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Images from '../../constants/Images';
import {useState} from 'react';
import Button from '../../components/Button';
import Fonts from '../../constants/Fonts';
import {updateUserAddress} from '../../redux/actions/userActions';
import {connect, useDispatch} from 'react-redux';

const EditAddressScreen = ({navigation, route, updateUserAddress}) => {
  const dispatch = useDispatch();
  const {address} = route.params;
  const [formValue, setFormValue] = useState({
    street: address.street,
    district: address.district,
    state: address.state,
    country: address.country,
  });

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onSubmit() {
    let permitSubmit = true;
    if (
      !formValue.street ||
      !formValue.district ||
      !formValue.state ||
      !formValue.country
    ) {
      showErrorToast('All fields must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      updateUserAddress(dispatch, address.id, formValue, () => {
        navigation.goBack();
      });
    }
  }

  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Edit Address" backEnabled navigation={navigation} />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <Input
          value={formValue.street}
          onChangeText={value => onChangeTextInput(value, 'street')}
          style={{marginBottom: Sizes.space3}}
          placeholder="Address"
          renderLeftIcon={() => <RenderPNG imageSource={Images.address} />}
        />
        <Input
          value={formValue.district}
          placeholder="District"
          onChangeText={value => onChangeTextInput(value, 'district')}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.district} />}
        />
        <Input
          value={formValue.state}
          placeholder="State"
          onChangeText={value => onChangeTextInput(value, 'state')}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.city} />}
        />
        <Input
          value={formValue.country}
          onChangeText={value => onChangeTextInput(value, 'country')}
          placeholder="Country"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.country} />}
        />
        <Button
          text="Update address"
          textStyle={{...Fonts.body4}}
          onPress={() => onSubmit()}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {
    updateUserAddress,
  };
};

export default connect(mapStateToProps, mapActionToProps)(EditAddressScreen);
