import React, {FunctionComponent} from 'react';

import {Image, Text, View} from '../rn-styled';
import {Hour} from '../../helpers/types';
import {formatTime} from '../../helpers/datetime-formatter';

type ForecastTileProps = {
  hour: Hour;
  timezone: string;
};

const ForecastTile: FunctionComponent<ForecastTileProps> = ({
  hour,
  timezone,
}) => {
  return (
    <View
      key={`hour_${hour.time_epoch}`}
      className="flex-1 items-center justify-center bg-[#ffffff22] rounded-xl mx-2 py-2">
      <Text className="text-xs">{`${hour.temp_c.toFixed(0)}°C`}</Text>
      <Image
        source={{uri: `https:${hour.condition.icon}`}}
        className="w-12 h-12"
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Text className="text-xs">{formatTime(hour.time_epoch, timezone)}</Text>
    </View>
  );
};

export default ForecastTile;
