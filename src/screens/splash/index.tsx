import React, {FunctionComponent, useEffect} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {ROUTES} from '../../helpers/constants';
import {Text, View} from '../../components/rn-styled';

const Splash: FunctionComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(CommonActions.navigate(ROUTES.HOME));
    }, 2000);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-semibold text-primary text-xl">Global</Text>
    </View>
  );
};

export default Splash;
