import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import Loading from './src/components/Loading';
import {loadUser} from './src/redux/actions/authActions';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WalkThroughScreen from './src/screens/WalkThroughScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Toast from 'react-native-toast-message';
import {setAuthToken} from './src/utils/SetAuthToken';
import axios from 'axios';

const AppStack = createNativeStackNavigator();

const App = ({user, isPending, token, loadUser}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(token);
    loadUser(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Loading visible={isPending} />
        {!user || !token ? (
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <AppStack.Screen
              name="WalkThroughScreen"
              component={WalkThroughScreen}
            />
            <AppStack.Screen name="LoginScreen" component={LoginScreen} />
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
          </AppStack.Navigator>
        ) : (
          <MainScreen />
        )}
        <Toast />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isPending: state.common.isPending,
    token: state.auth.access_token,
  };
};

const mapActionToProps = () => {
  return {
    loadUser,
  };
};

export default connect(mapStateToProps, mapActionToProps)(App);
