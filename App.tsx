import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {RootNavigator} from './src/navigators';

const App: FunctionComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'dark' : 'light',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.flex1}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
    },
    flex1: {
      flex: 1,
    },
  });

export default App;
