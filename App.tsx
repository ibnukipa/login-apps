/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {FunctionComponent} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootRoute from './src/routes/RootRoute';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
]);

const App: FunctionComponent = () => {
  return (
    <SafeAreaProvider>
      <RootRoute />
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

export default App;
