import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './src/navigators';

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
