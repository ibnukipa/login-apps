import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegistrationScreen from '../screens/Registration';

const AuthRouteStack = createStackNavigator();

const AuthRoute: FunctionComponent = () => {
  return (
    <AuthRouteStack.Navigator screenOptions={{headerShown: false}}>
      <AuthRouteStack.Screen
        name={'registration'}
        component={RegistrationScreen}
      />
    </AuthRouteStack.Navigator>
  );
};

export default AuthRoute;
