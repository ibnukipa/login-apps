import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthRoute from './AuthRoute';
import AppRoute from './AppRoute';

const RootRouteStack = createStackNavigator();

const RootRoute: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <RootRouteStack.Navigator screenOptions={{headerShown: false}}>
        <RootRouteStack.Screen name={'Auth'} component={AuthRoute} />
        <RootRouteStack.Screen name={'App'} component={AppRoute} />
      </RootRouteStack.Navigator>
    </NavigationContainer>
  );
};

export default RootRoute;
