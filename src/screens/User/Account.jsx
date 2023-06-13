import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import AddressesScreen from './AddressesScreen';
import AddAddressScreen from './AddAddressScreen';
import InformationScreen from './InformationScreen';
import EditInformationScreen from './EditInformationScreen';
import EditAddressScreen from './EditAddressScreen';
import OrdersScreen from './OrdersScreen';
import LeaveReviewScreen from './LeaveReviewScreen';

const AccountStack = createNativeStackNavigator();

const Account = () => {
  return (
    <AccountStack.Navigator screenOptions={{headerShown: false}}>
      <AccountStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AccountStack.Screen name="AddressesScreen" component={AddressesScreen} />
      <AccountStack.Screen
        name="AddAddressScreen"
        component={AddAddressScreen}
      />
      <AccountStack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
      />
      <AccountStack.Screen
        name="InformationScreen"
        component={InformationScreen}
      />
      <AccountStack.Screen
        name="EditInformationScreen"
        component={EditInformationScreen}
      />
      <AccountStack.Screen name="OrdersScreen" component={OrdersScreen} />
      <AccountStack.Screen
        name="LeaveReviewScreen"
        component={LeaveReviewScreen}
      />
    </AccountStack.Navigator>
  );
};

export default Account;
