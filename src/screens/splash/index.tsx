import React, {FunctionComponent, useEffect} from 'react';
import {View, Text} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

import useTheme from '../../hooks/useTheme';
import createStyles from './styles';
import {ROUTES} from '../../helpers/constants';

const Splash: FunctionComponent = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(CommonActions.navigate(ROUTES.HOME));
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global</Text>
    </View>
  );
};

export default Splash;
