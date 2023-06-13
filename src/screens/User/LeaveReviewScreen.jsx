import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import LeaveReviewItem from '../../components/FlatListItem/LeaveReviewItem';
import Sizes from '../../constants/Sizes';

const LeaveReviewScreen = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Leave a review" backEnabled navigation={navigation} />
      )}>
      <View
        style={{
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
        }}>
        {data.orderItems.map((item, index) => (
          <LeaveReviewItem data={item.product} key={index} />
        ))}
      </View>
    </MainLayout>
  );
};

export default LeaveReviewScreen;
