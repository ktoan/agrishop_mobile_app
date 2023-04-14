import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Text} from 'native-base';
import React from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import WalkThroughScreen from './src/screens/WalkThroughScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';

const AppStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <AppStack.Navigator screenOptions={{headerShown: false}}>
          <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <AppStack.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <AppStack.Screen name="LoginScreen" component={LoginScreen} />
          <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </AppStack.Navigator> */}
        <MainScreen />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
