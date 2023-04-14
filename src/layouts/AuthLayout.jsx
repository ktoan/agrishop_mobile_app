import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

export default function AuthLayout({
  children,
  title = 'Title',
  sub_title = 'This is the subtitle',
}) {
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{padding: Sizes.space4, paddingTop: Sizes.space6}}>
        <View>
          <Text style={{...Fonts.h1, marginBottom: Sizes.space1}}>{title}</Text>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
              marginBottom: Sizes.space3,
            }}>
            {sub_title}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Sizes.space4,
          width: '100%',
          paddingBottom: Sizes.space6,
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
