import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import InformationFlatListItem from '../../components/FlatListItem/InformationFlatListItem';
import Header from '../../components/Header';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import {connect} from 'react-redux';

const InformationScreen = ({navigation, user}) => {
  return (
    <MainLayout
      renderHeader={() => (
        <Header
          backEnabled
          navigation={navigation}
          title="My Information"
          renderRightIcon={() => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: Sizes.space1,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.yellow,
              }}
              onPress={() => navigation.navigate('EditInformationScreen')}>
              <RenderPNG imageSource={Images.edit} size={18} />
            </TouchableOpacity>
          )}
        />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}>
          <RenderPNG
            imageSource={{
              uri: user.avatar,
            }}
            size={100}
            style={{borderRadius: 10}}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 30,
              height: 30,
              backgroundColor: Colors.primary,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              marginBottom: -15,
            }}>
            <RenderPNG size={20} imageSource={Images.camera_light} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        <InformationFlatListItem
          label={'Full Name'}
          value={user.fullName}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Email Address'}
          value={user.email}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Phone Number'}
          value={user.phone}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Gender'}
          value={user.gender}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Day Of Birth'}
          value={user.dayOfBirth}
          style={{marginBottom: Sizes.space3}}
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

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(InformationScreen);
