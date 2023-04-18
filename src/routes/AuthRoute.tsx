import React, {FunctionComponent} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import RegistrationScreen from '../screens/Registration';
import PinScreen from '../screens/Pin';

const AuthRouteStack = createStackNavigator();

const AuthRoute: FunctionComponent = () => {
  return (
    <AuthRouteStack.Navigator screenOptions={{headerShown: false}}>
      <AuthRouteStack.Screen
        name={'registration'}
        component={RegistrationScreen}
      />
      <AuthRouteStack.Screen
        options={{
          gestureEnabled: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        name={'Pin'}
        component={PinScreen}
      />
    </AuthRouteStack.Navigator>
  );
};

export default AuthRoute;
