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

const App: FunctionComponent = () => {
  return (
    <SafeAreaProvider>
      <RootRoute />
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

export default App;
