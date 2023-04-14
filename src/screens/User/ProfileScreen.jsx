import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import RenderPNG from '../../components/RenderPNG';
import Fonts from '../../constants/Fonts';
import Button from '../../components/Button';
import LineDivider from '../../components/LineDivider';
import {profile_links} from '../../constants/Data';
import ProfileLinkFlatListItem from '../../components/FlatListItem/ProfileLinkFlatListItem';

const ProfileScreen = ({navigation}) => {
  const renderHeader = () => {
    return (
      <>
        <Header title="Profile" />
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          <View
            style={{
              paddingVertical: Sizes.space3,
              paddingHorizontal: Sizes.space4,
              backgroundColor: Colors.light,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <RenderPNG
              imageSource={{
                uri: 'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.6435-9/169267831_1253554315046481_8931794399160773609_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=t799v6q8gysAX8nZybf&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAz8oTtq1-HKVlLZPSYJ1DI-SSfhEX7uCvV_CktxIjtlw&oe=645DFF78',
              }}
              size={100}
              style={{borderRadius: 10}}
            />
            <View style={{flex: 1, marginLeft: Sizes.space3}}>
              <Text style={{...Fonts.h4, width: '90%'}} numberOfLines={1}>
                Nguyen Khanh Toan
              </Text>
              <Text
                style={{
                  ...Fonts.body5,
                  color: Colors.grey,
                  marginBottom: Sizes.space3,
                  width: '90%',
                }}
                numberOfLines={1}>
                (nktoan.20it1@vku.udn.vn)
              </Text>
              <Button
                text="Lock your account"
                textStyle={{...Fonts.body5}}
                bgColor={Colors.red}
                bdColor={Colors.red}
                style={{marginBottom: Sizes.space3}}
              />
              <Button
                text="Change your password"
                textStyle={{...Fonts.body5}}
                bgColor={Colors.yellow}
                bdColor={Colors.yellow}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  function onPress(data) {
    !data.logout && navigation.navigate(data.redirectTo);
  }

  return (
    <MainLayout renderHeader={renderHeader}>
      <LineDivider />
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {profile_links.map((item, index) => (
          <ProfileLinkFlatListItem
            key={item.id}
            data={item}
            isLast={index === profile_links.length - 1}
            onPress={() => onPress(item)}
          />
        ))}
      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
