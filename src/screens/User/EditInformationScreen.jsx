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
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react';
import {showErrorToast, showSuccessToast} from '../../utils/ToastActions';
import {updateUserInformation} from '../../redux/actions/authActions';

const EditInformationScreen = ({navigation, user}) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    dayOfBirth: user.dayOfBirth,
    gender: user.gender,
  });

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onChangeSelectDropdown(value) {
    setFormValue(formValue => ({...formValue, gender: value}));
  }

  function onChangeDateInput(value) {
    setFormValue(formValue => ({...formValue, dayOfBirth: value}));
  }

  function onSubmitForm() {
    let permitSubmit = true;
    if (
      !formValue.email ||
      !formValue.fullName ||
      !formValue.gender ||
      !formValue.phone ||
      !formValue.dayOfBirth
    ) {
      showErrorToast('All fields must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      updateUserInformation(dispatch, formValue, user.id, () => {
        navigation.goBack(null);
      });
    }
  }

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
          value={formValue.email}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        />
        <Input
          onChangeText={value => onChangeTextInput(value, 'fullName')}
          placeholder="Full Name"
          value={formValue.fullName}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.name} />}
        />
        <Input
          onChangeText={value => onChangeTextInput(value, 'phone')}
          placeholder="Phone Number"
          value={formValue.phone}
          style={{marginBottom: Sizes.space3}}
          renderLeftIcon={() => <RenderPNG imageSource={Images.phone} />}
        />
        <DateInput
          setValue={onChangeDateInput}
          placeholder="Day Of Birth"
          value={formValue.dayOfBirth}
        />
        <SelectDropdown
          value={formValue.gender}
          onChangeValue={onChangeSelectDropdown}
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
          onPress={() => onSubmitForm()}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapActionToProps = () => {
  return {
    updateUserInformation,
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps,
)(EditInformationScreen);
