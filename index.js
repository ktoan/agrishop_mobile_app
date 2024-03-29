/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import Store from './src/redux/store';

const ReduxApp = () => {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
