import React, {FunctionComponent} from 'react';

import {View, Text} from 'react-native';
import useTheme from '../../hooks/useTheme';
import createStyles from './styles';

const Header: FunctionComponent = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Header</Text>
    </View>
  );
};

export default Header;
