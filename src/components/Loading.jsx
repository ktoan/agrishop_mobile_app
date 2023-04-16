import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Colors from '../constants/Colors';

const Loading = ({visible}) => {
  return (
    <Spinner
      animation="fade"
      visible={visible}
      color={Colors.white}
      size={'large'}
    />
  );
};

export default Loading;
