import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import Input from '../components/Input';
import RenderPNG from '../components/RenderPNG';
import SelectDropdown from '../components/SelectDropdown';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Shadow from '../constants/Shadow';
import Sizes from '../constants/Sizes';
import AuthLayout from '../layouts/AuthLayout';
import LineDivider from '../components/LineDivider';

const RegisterScreen = ({navigation}) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    dayOfBirth: '',
    gender: '',
    phone: '',
  });

  return (
    <AuthLayout title="Register" sub_title="Enter your details to accompany us">
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        placeholder="Email"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.name} />}
        placeholder="Full Name"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Password"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Confirmation Password"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.phone} />}
        placeholder="Phone Number"
        style={{marginBottom: Sizes.space3}}
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

export default RegisterScreen;
