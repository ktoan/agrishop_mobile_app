import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import RenderPNG from '../components/RenderPNG';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Shadow from '../constants/Shadow';
import Sizes from '../constants/Sizes';
import AuthLayout from '../layouts/AuthLayout';

const LoginScreen = ({navigation}) => {
  return (
    <AuthLayout title="Login" sub_title="Welcome back! You've been missed!">
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        placeholder="Email"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Password"
        style={{marginBottom: Sizes.space3}}
      />
      <Button
        text="Login"
        style={{...Shadow, marginBottom: Sizes.space3}}
        textStyle={{...Fonts.body4}}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        activeOpacity={0.7}>
        <Text style={{textAlign: 'center', ...Fonts.body5, color: Colors.grey}}>
          Don't you have any account? Register here.
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default LoginScreen;
