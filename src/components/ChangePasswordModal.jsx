import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import {categories} from '../constants/FakeData';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Sizes from '../constants/Sizes';
import {convertCategoryFromServerToRendered} from '../utils/CategoryHandling';
import Button from './Button';
import Input from './Input';
import RenderPNG from './RenderPNG';
import {connect, useDispatch} from 'react-redux';
import {changePassword} from '../redux/actions/authActions';
import {showErrorToast} from '../utils/ToastActions';

const ChangePasswordModal = ({
  isVisible,
  onClose = () => {},
  changePassword,
  user,
}) => {
  const dispatch = useDispatch();
  const modalAnimationValue = useRef(new Animated.Value(0)).current;
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState(isVisible);
  const [formValue, setFormValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onSubmitForm() {
    let permitSubmit = true;
    if (
      !formValue.oldPassword ||
      !formValue.newPassword ||
      !formValue.confirmNewPassword
    ) {
      showErrorToast('All fields must be filled!');
      permitSubmit = false;
    }
    if (permitSubmit) {
      const {confirmNewPassword, ...submitForm} = formValue;
      changePassword(dispatch, submitForm, user.id, () => {
        setShowChangePasswordModal(false);
      });
    }
  }

  useEffect(() => {
    if (showChangePasswordModal) {
      Animated.timing(modalAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showChangePasswordModal]);

  const modalY = modalAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Sizes.height, Sizes.height - 680],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: Colors.overlay}}>
        <TouchableWithoutFeedback
          onPress={() => setShowChangePasswordModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: Colors.white,
          }}>
          <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
            Change Password
          </Text>
          <Input
            password
            value={formValue.oldPassword}
            onChangeText={value => onChangeTextInput(value, 'oldPassword')}
            placeholder="Old Password"
            renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
            style={{marginBottom: Sizes.space3}}
          />
          <Input
            password
            value={formValue.newPassword}
            onChangeText={value => onChangeTextInput(value, 'newPassword')}
            placeholder="New Password"
            renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
            style={{marginBottom: Sizes.space3}}
          />
          <Input
            password
            value={formValue.confirmNewPassword}
            onChangeText={value =>
              onChangeTextInput(value, 'confirmNewPassword')
            }
            placeholder="Confirm New Password"
            renderLeftIcon={() => <RenderPNG imageSource={Images.password} />}
            style={{marginBottom: Sizes.space3}}
          />
          <Button
            text="Apply changes"
            textStyle={{...Fonts.body4}}
            onPress={() => onSubmitForm()}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapActionToProps = () => {
  return {changePassword};
};

export default connect(mapStateToProps, mapActionToProps)(ChangePasswordModal);
