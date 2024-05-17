import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';

import useTheme from '../../hooks/useTheme';
import createStyles from './styles';
import {Header} from '../../components';

const Home: FunctionComponent = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

export default Home;
