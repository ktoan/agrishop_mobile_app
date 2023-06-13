import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import Images from '../../constants/Images';
import Button from '../../components/Button';
import Sizes from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import {
  sendConfirmCode,
  confirmRegistration,
} from '../../redux/actions/authActions';
import {connect, useDispatch} from 'react-redux';
import {showErrorToast} from '../../utils/ToastActions';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';

const VerifyAccountScreen = ({
  navigation,
  route,
  sendConfirmCode,
  confirmRegistration,
}) => {
  const dispatch = useDispatch();
  const {email} = route.params;
  const [isSentMail, setSentMail] = useState(false);
  const [confirmedMail, setConfirmedMail] = useState(email || '');
  const [token, setToken] = useState('');

  function onSubmitSendEmail() {
    let permitSubmit = true;
    if (!confirmedMail) {
      showErrorToast('Email must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      sendConfirmCode(
        dispatch,
        confirmedMail,
        () => {
          setSentMail(true);
        },
        () => {
          setSentMail(true);
        },
      );
    }
  }

  function onSubmitConfirmRegistration() {
    let permitSubmit = true;
    if (!token) {
      showErrorToast('Token must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      confirmRegistration(dispatch, token, () => {
        navigation.navigate('LoginScreen');
      });
    }
  }

  return (
    <AuthLayout
      title="Verify your account"
      sub_title="Enter your email to confirm your registration!">
      {!isSentMail ? (
        <>
          <Input
            style={{marginBottom: Sizes.space3}}
            placeholder="Your email"
            value={confirmedMail}
            renderLeftIcon={() => <RenderPNG imageSource={Images.email} />}
            onChangeText={value => setConfirmedMail(value)}
          />
          <Button
            text="Send token"
            textStyle={{...Fonts.h5}}
            onPress={() => onSubmitSendEmail()}
          />
        </>
      ) : (
        <>
          <Input
            style={{marginBottom: Sizes.space3}}
            placeholder="Your token"
            value={token}
            renderLeftIcon={() => <RenderPNG imageSource={Images.text} />}
            onChangeText={value => setToken(value)}
          />
          <Button
            text="Confirm registration"
            textStyle={{...Fonts.h5}}
            onPress={() => onSubmitConfirmRegistration()}
            style={{marginBottom: Sizes.space3}}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setToken('');
              setSentMail(false);
            }}>
            <Text
              style={{...Fonts.body5, color: Colors.grey, textAlign: 'center'}}>
              Back to enter email screen
            </Text>
          </TouchableOpacity>
        </>
      )}
    </AuthLayout>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapActionToProps = () => {
  return {
    sendConfirmCode,
    confirmRegistration,
  };
};

export default connect(mapStateToProps, mapActionToProps)(VerifyAccountScreen);
