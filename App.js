import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {connect, useDispatch} from 'react-redux';
import Loading from './src/components/Loading';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import WalkThroughScreen from './src/screens/WalkThroughScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainScreen from './src/screens/MainScreen';
import {loadUser} from './src/redux/actions/authActions';
import {setAuthToken} from './src/utils/SetAuthToken';
import VerifyAccountScreen from './src/screens/Auth/VerifyAccountScreen';

const AppStack = createNativeStackNavigator();

const App = ({user, token, isLoading}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setAuthToken(token);
    loadUser(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Loading visible={isLoading} />
        {user && token ? (
          <MainScreen />
        ) : (
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <AppStack.Screen
              name="WalkThroughScreen"
              component={WalkThroughScreen}
            />
            <AppStack.Screen name="LoginScreen" component={LoginScreen} />
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <AppStack.Screen
              name="VerifyAccountScreen"
              component={VerifyAccountScreen}
            />
          </AppStack.Navigator>
        )}
        <Toast />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    isLoading: state.common.isLoading,
  };
};

const mapActionToProps = () => {
  return {
    loadUser,
  };
};

export default connect(mapStateToProps, mapActionToProps)(App);
