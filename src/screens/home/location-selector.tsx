import React, {FunctionComponent} from 'react';
import {MapPinIcon} from 'react-native-heroicons/solid';
import type {ListRenderItem} from 'react-native';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from '../../components/rn-styled';

import {TLocation} from '../../helpers/types';

type LocationSelectorProps = {
  locations: TLocation[];
  handleLocation: (location: TLocation) => void;
};

const LocationSelector: FunctionComponent<LocationSelectorProps> = ({
  locations,
  handleLocation,
}) => {
  const _renderItem: ListRenderItem<TLocation> = ({item}) => (
    <TouchableOpacity
      onPress={() => handleLocation(item)}
      className="flex-row items-center border-0 border-b-[0.2px] h-15 p-3 px-4 mb-1">
      <MapPinIcon color="black" />
      <Text className="text-black text-lg ml-2">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="absolute w-screen self-center top-[60px]">
      <FlatList
        data={locations}
        renderItem={_renderItem as ListRenderItem<unknown>}
        keyExtractor={(_, index) => `location_${index}`}
        className="bg-[#ffffff] rounded-3xl mx-4"
      />
    </View>
  );
};

export default LocationSelector;
