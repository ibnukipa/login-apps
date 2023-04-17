/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {FunctionComponent} from 'react';
import RegistrationScreen from './src/screens/Registration';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: FunctionComponent = () => {
  return (
    <SafeAreaProvider>
      <RegistrationScreen />
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

export default App;
