import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import DateInput from '../../components/DateInput';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import SelectDropdown from '../../components/SelectDropdown';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Shadow from '../../constants/Shadow';
import Sizes from '../../constants/Sizes';
import AuthLayout from '../../layouts/AuthLayout';
import {registerNewUser} from '../../redux/actions/authActions';
import {showErrorToast} from '../../utils/ToastActions';

const RegisterScreen = ({navigation, registerNewUser}) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    dayOfBirth: '',
    gender: '',
    phone: '',
  });

  function onChangeTextInput(value, name) {
    setFormValue({...formValue, [name]: value});
  }

  function onChangeSelectDropdown(value) {
    setFormValue({...formValue, gender: value});
  }

  function onChangeDateInput(value) {
    setFormValue({...formValue, dayOfBirth: value});
  }

  function onSubmitForm() {
    let permitSubmit = true;
    if (
      !formValue.email ||
      !formValue.fullName ||
      !formValue.password ||
      !formValue.confirmPassword ||
      !formValue.phone ||
      !formValue.dayOfBirth ||
      !formValue.gender
    ) {
      showErrorToast('All fields must be filled!');
      permitSubmit = false;
    }
    if (formValue.password !== formValue.confirmPassword) {
      showErrorToast('Confirmation password is not matched!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      const {confirmPassword, ...registerForm} = formValue;
      registerNewUser(dispatch, registerForm, () => {
        clearForm();
        navigation.navigate('LoginScreen');
      });
    }
  }

  function clearForm() {
    setFormValue({
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      dayOfBirth: '',
      gender: '',
      phone: '',
    });
  }

  return (
    <AuthLayout title="Register" sub_title="Enter your details to accompany us">
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        placeholder="Email"
        style={{marginBottom: Sizes.space3}}
        value={formValue.email}
        onChangeText={value => onChangeTextInput(value, 'email')}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.name} />}
        placeholder="Full Name"
        style={{marginBottom: Sizes.space3}}
        value={formValue.fullName}
        onChangeText={value => onChangeTextInput(value, 'fullName')}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Password"
        style={{marginBottom: Sizes.space3}}
        value={formValue.password}
        onChangeText={value => onChangeTextInput(value, 'password')}
        password
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Confirmation Password"
        password
        style={{marginBottom: Sizes.space3}}
        value={formValue.confirmPassword}
        onChangeText={value => onChangeTextInput(value, 'confirmPassword')}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.phone} />}
        placeholder="Phone Number"
        value={formValue.phone}
        onChangeText={value => onChangeTextInput(value, 'phone')}
        style={{marginBottom: Sizes.space3}}
      />
      <DateInput
        placeholder="Day Of Birth"
        value={formValue.dayOfBirth}
        setValue={onChangeDateInput}
      />
      <SelectDropdown
        data={[
          {value: 'MALE', label: 'Male'},
          {value: 'FEMALE', label: 'Female'},
          {value: 'DISCLOSED', label: 'Disclosed'},
        ]}
        onChangeValue={onChangeSelectDropdown}
        renderLeftIcon={() => <RenderPNG imageSource={Images.gender} />}
        placeholder={'Gender'}
      />
      <Button
        onPress={() => onSubmitForm()}
        text="Register"
        style={{...Shadow, marginBottom: Sizes.space3}}
        textStyle={{...Fonts.body4}}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        activeOpacity={0.7}>
        <Text style={{textAlign: 'center', ...Fonts.body5, color: Colors.grey}}>
          Do you have an account? Login here.
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {registerNewUser};
};

export default connect(mapStateToProps, mapActionToProps)(RegisterScreen);
