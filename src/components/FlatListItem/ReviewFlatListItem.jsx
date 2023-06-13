import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import Shadow from '../../constants/Shadow';
import RenderPNG from '../RenderPNG';
import Fonts from '../../constants/Fonts';
import {Rating} from 'react-native-ratings';
import Images from '../../constants/Images';
import {useSelector} from 'react-redux';

const ReviewFlatListItem = ({data, isLast}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <View
      style={{
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        backgroundColor: Colors.white,
        ...Shadow,
        marginBottom: isLast ? 0 : Sizes.space3,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Sizes.space3,
        }}>
        <RenderPNG
          imageSource={{uri: data.user.avatar}}
          size={60}
          style={{borderRadius: 30}}
        />
        <View style={{flex: 1, marginLeft: Sizes.space3}}>
          <Text style={{...Fonts.h4, marginBottom: Sizes.space2}}>
            {data.user.fullName}
          </Text>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
              marginBottom: Sizes.space2,
            }}>
            {data.comment}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Rating readonly startingValue={data.value} imageSize={18} />
            <View style={{flex: 1}}></View>
          </View>
        </View>
        {user.id === data.user.id && (
          <RenderPNG imageSource={Images.ellipsis} />
        )}
      </View>
    </View>
  );
};

export default ReviewFlatListItem;
