import React, {FunctionComponent} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import PinScreen from '../screens/Pin';

const AppRouteStack = createStackNavigator();

const AppRoute: FunctionComponent = () => {
  return (
    <AppRouteStack.Navigator screenOptions={{headerShown: false}}>
      <AppRouteStack.Screen name={'Home'} component={HomeScreen} />
      <AppRouteStack.Screen
        options={{
          gestureEnabled: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        name={'Pin'}
        component={PinScreen}
      />
    </AppRouteStack.Navigator>
  );
};

export default AppRoute;
