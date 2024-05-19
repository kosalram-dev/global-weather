import React, {FunctionComponent} from 'react';

import {Text, View, Image} from '../rn-styled';
import {Current, TInfoChip} from '../../helpers/types';

type InfoChipProps = {
  data: TInfoChip;
  current: Current;
};

const InfoChip: FunctionComponent<InfoChipProps> = ({data, current}) => {
  return (
    <View className="flex-1 items-center">
      <Image
        source={data.image}
        className="w-6 h-6"
        resizeMode="contain"
        resizeMethod="resize"
      />
      <View className="mt-2 h-[0.5px] w-12 rounded-full bg-black" />
      <Text className="font-normal capitalize text-black text-md py-2">
        {data.title}
      </Text>
      <Text className="font-normal capitalize text-black text-md">
        {`${current[data.key]} ${data.unit}`}
      </Text>
    </View>
  );
};

export default InfoChip;
