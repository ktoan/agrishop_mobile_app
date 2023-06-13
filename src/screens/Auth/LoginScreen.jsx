import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Shadow from '../../constants/Shadow';
import Sizes from '../../constants/Sizes';
import AuthLayout from '../../layouts/AuthLayout';
import {loginUser} from '../../redux/actions/authActions';
import {showErrorToast} from '../../utils/ToastActions';

const LoginScreen = ({navigation, loginUser}) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({email: '', password: ''});

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onSubmitForm() {
    let permitSubmit = true;
    if (!formValue.email || !formValue.password) {
      showErrorToast('All fields must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      loginUser(dispatch, formValue, navigation);
    }
  }

  return (
    <AuthLayout title="Login" sub_title="Welcome back! You've been missed!">
      <Input
        value={formValue.email}
        onChangeText={value => onChangeTextInput(value, 'email')}
        renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
        placeholder="Email"
        style={{marginBottom: Sizes.space3}}
      />
      <Input
        password
        value={formValue.password}
        onChangeText={value => onChangeTextInput(value, 'password')}
        renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
        placeholder="Password"
        style={{marginBottom: Sizes.space3}}
      />
      <Button
        onPress={() => onSubmitForm()}
        text="Login"
        style={{...Shadow, marginBottom: Sizes.space3}}
        textStyle={{...Fonts.body4}}
      />
      <TouchableOpacity
        style={{marginBottom: Sizes.space3}}
        onPress={() => navigation.navigate('RegisterScreen')}
        activeOpacity={0.7}>
        <Text style={{textAlign: 'center', ...Fonts.body5, color: Colors.grey}}>
          Don't you have any account? Register here.
        </Text>
      </TouchableOpacity>
      <Button
        textStyle={{...Fonts.body4}}
        style={{marginBottom: Sizes.space3}}
        bgColor={Colors.facebook}
        bdColor={Colors.facebook}
        text="Login by Facebook"
      />
      <Button
        textStyle={{...Fonts.body4}}
        text="Login by Google"
        bgColor={Colors.google}
        bdColor={Colors.google}
      />
    </AuthLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {loginUser};
};

export default connect(mapStateToProps, mapActionToProps)(LoginScreen);
