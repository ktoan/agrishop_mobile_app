import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const MainLayout = ({children, renderHeader = () => {}}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default MainLayout;
