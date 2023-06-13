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
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react';
import {logoutUser} from '../../redux/actions/authActions';
import ChangePasswordModal from '../../components/ChangePasswordModal';

const ProfileScreen = ({navigation, logoutUser, user}) => {
  const dispatch = useDispatch();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
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
                uri: user.avatar,
              }}
              size={100}
              style={{borderRadius: 10}}
            />
            <View style={{flex: 1, marginLeft: Sizes.space3}}>
              <Text style={{...Fonts.h4, width: '90%'}} numberOfLines={1}>
                {user.fullName}
              </Text>
              <Text
                style={{
                  ...Fonts.body5,
                  color: Colors.grey,
                  marginBottom: Sizes.space3,
                  width: '90%',
                }}
                numberOfLines={1}>
                ({user.email})
              </Text>
              <Button
                text="Change your password"
                textStyle={{...Fonts.body5}}
                bgColor={Colors.yellow}
                bdColor={Colors.yellow}
                onPress={() => setShowChangePasswordModal(true)}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  function onPress(data) {
    if (!data.logout) {
      navigation.navigate(data.redirectTo);
    } else {
      logoutUser(dispatch);
    }
  }

  return (
    <MainLayout renderHeader={renderHeader}>
      <LineDivider />
      {showChangePasswordModal && (
        <ChangePasswordModal
          isVisible={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapActionToProps = () => {
  return {
    logoutUser,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProfileScreen);
