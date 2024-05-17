import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from '../helpers/constants';
import {Splash, Home} from '../screens';

const Stack = createStackNavigator();

const RootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.SPLASH} component={Splash} />
      <Stack.Screen name={ROUTES.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
