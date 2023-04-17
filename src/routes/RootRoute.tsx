import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AuthRoute from './AuthRoute';
import AppRoute from './AppRoute';
import {useLoggedIn} from '../hooks/useRegistrationDB';

const RootRouteStack = createStackNavigator();

const RootRoute: FunctionComponent = () => {
  const [isLoggedIn] = useLoggedIn();

  return (
    <NavigationContainer>
      <RootRouteStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}>
        {isLoggedIn ? (
          <RootRouteStack.Screen name={'App'} component={AppRoute} />
        ) : (
          <RootRouteStack.Screen name={'Auth'} component={AuthRoute} />
        )}
      </RootRouteStack.Navigator>
    </NavigationContainer>
  );
};

export default RootRoute;
