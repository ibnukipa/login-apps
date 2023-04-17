import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';

const AppRouteStack = createStackNavigator();

const AppRoute: FunctionComponent = () => {
  return (
    <AppRouteStack.Navigator screenOptions={{headerShown: false}}>
      <AppRouteStack.Screen name={'Home'} component={HomeScreen} />
    </AppRouteStack.Navigator>
  );
};

export default AppRoute;
