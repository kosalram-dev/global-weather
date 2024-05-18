import React, {FunctionComponent} from 'react';
import {PlusIcon, Bars3BottomRightIcon} from 'react-native-heroicons/solid';

import {Text, View} from '../rn-styled';

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

const Header: FunctionComponent<HeaderProps> = ({title, subtitle}) => {
  return (
    <View className="items-center justify-between h-20 w-full flex-row px-4">
      <PlusIcon color="black" />
      <View className="flex-1 items-center justify-center">
        {title && (
          <Text className="text-xl font-bold text-black text-center">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text className="text-xs font-normal text-black text-center">
            {subtitle}
          </Text>
        )}
      </View>
      <Bars3BottomRightIcon color="black" />
    </View>
  );
};

export default Header;
