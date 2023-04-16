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
import {useState} from 'react';
import {showErrorToast} from '../../utils/ToastActions';
import {createUserAddress} from '../../redux/actions/userActions';
import {connect, useDispatch} from 'react-redux';

const AddAddressScreen = ({navigation, createUserAddress}) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    street: '',
    district: '',
    state: '',
    country: '',
  });

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onSubmitForm() {
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
      createUserAddress(dispatch, formValue, () => {
        navigation.goBack(null);
      });
    }
  }

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
          value={formValue.street}
          onChangeText={value => onChangeTextInput(value, 'street')}
          placeholder="Street"
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.street} />}
        />
        <Input
          placeholder="District"
          value={formValue.district}
          onChangeText={value => onChangeTextInput(value, 'district')}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.district} />}
        />
        <Input
          placeholder="State"
          value={formValue.state}
          onChangeText={value => onChangeTextInput(value, 'state')}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.city} />}
        />
        <Input
          placeholder="Country"
          value={formValue.country}
          onChangeText={value => onChangeTextInput(value, 'country')}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.country} />}
        />
        <Button
          text="Create"
          textStyle={{...Fonts.body4}}
          onPress={() => onSubmitForm()}
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
    createUserAddress,
  };
};

export default connect(mapStateToProps, mapActionToProps)(AddAddressScreen);
