import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import InformationFlatListItem from '../../components/FlatListItem/InformationFlatListItem';
import Header from '../../components/Header';
import RenderPNG from '../../components/RenderPNG';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';

const InformationScreen = ({navigation}) => {
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
              uri: 'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.6435-9/169267831_1253554315046481_8931794399160773609_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=t799v6q8gysAX8nZybf&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAz8oTtq1-HKVlLZPSYJ1DI-SSfhEX7uCvV_CktxIjtlw&oe=645DFF78',
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
          value={'Nguyen Khanh Toan'}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Email Address'}
          value={'nktoan.20it1@vku.udn.vn'}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Phone Number'}
          value={'0868319857'}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Gender'}
          value={'Male'}
          style={{marginBottom: Sizes.space3}}
        />
        <InformationFlatListItem
          label={'Day Of Birth'}
          value={'06/03/2002'}
          style={{marginBottom: Sizes.space3}}
        />
      </View>
    </MainLayout>
  );
};

export default InformationScreen;
