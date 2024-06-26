import React, {FunctionComponent, useCallback, useState} from 'react';
import {ActivityIndicator, ImageSourcePropType, StatusBar} from 'react-native';

import {Header, InfoChip, ForecastTile} from '../../components';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
} from '../../components/rn-styled';
import useWeather, {DEFAULT_FORECAST_HOUR} from '../../hooks/useWeather';
import useDebounce from '../../hooks/useDebounce';
import {formatDate, roundOff} from '../../helpers/datetime-formatter';
import {TInfoChip, TLocation} from '../../helpers/types';

import ClearSky from '../../assets/clear_sky.jpg';
import CloudSky from '../../assets/cloudy_sky.jpg';
import Rain from '../../assets/rain.jpg';

import Humidity from '../../assets/humidity.png';
import Wind from '../../assets/wind.png';
import Precipitation from '../../assets/weather.png';
import useLocation from '../../hooks/useLocation';
import LocationSelector from './location-selector';

const infoChips: TInfoChip[] = [
  {
    id: 1,
    image: Humidity,
    title: 'Humidity',
    key: 'humidity',
    unit: '%',
  },
  {
    id: 2,
    image: Wind,
    title: 'Wind now',
    key: 'wind_kph',
    unit: 'kmph',
  },
  {
    id: 3,
    image: Precipitation,
    title: 'Precipitation',
    key: 'precip_in',
    unit: '%',
  },
];

const getBackgroundImage = (value?: string): ImageSourcePropType => {
  if (value && value.toLowerCase().includes('rain')) {
    value = 'rain';
  } else if (value) {
    value = value.toLowerCase();
  }
  switch (value) {
    case 'overcast':
    case 'partly cloudy':
      return CloudSky as ImageSourcePropType;
    case 'rain':
      return Rain as ImageSourcePropType;
    case 'clear':
    case 'sunny':
    default:
      return ClearSky as ImageSourcePropType;
  }
};

const Home: FunctionComponent = () => {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {location, current, forecast, getWeatherForecast, loading} =
    useWeather();
  const {locations, reset: resetLocations} = useLocation(debouncedSearchTerm);

  const handleLocation = (data: TLocation) => {
    getWeatherForecast(data.name);
    setToggleSearch(false);
    resetLocations();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const getMaxAndMinTempOfDay = useCallback(() => {
    if (forecast && forecast.forecastday.length > 0) {
      return `${roundOff(forecast.forecastday[0].day.maxtemp_c)}° / ${roundOff(
        forecast.forecastday[0].day.mintemp_c,
      )}°`;
    }
  }, [forecast]);

  const getForecastHours = useCallback(() => {
    if (location && forecast && forecast.forecastday.length > 0) {
      let result = forecast.forecastday[0].hour.filter(
        hour => hour.time_epoch > location.localtime_epoch,
      );
      if (result.length < DEFAULT_FORECAST_HOUR) {
        const nextDorecastDayHours = forecast.forecastday[1].hour.splice(
          0,
          DEFAULT_FORECAST_HOUR - result.length,
        );
        const nextDayForecasts = nextDorecastDayHours.filter(
          hour => hour.time_epoch > location.localtime_epoch,
        );
        result = [...result, ...nextDayForecasts];
      }
      return result.splice(0, DEFAULT_FORECAST_HOUR);
    }

    return [];
  }, [forecast, location]);

  return (
    <ImageBackground
      blurRadius={90}
      source={getBackgroundImage(current?.condition.text)}
      className="flex-1 relative">
      <StatusBar barStyle="dark-content" />
      <Image
        blurRadius={loading ? 90 : 0}
        source={getBackgroundImage(current?.condition.text)}
        className="absolute w-full h-2/3 rounded-[30px]"
      />
      {loading ? (
        <View className="flex-1 bg-[#ffffff99] items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SafeAreaView className="flex-1 flex-col">
          <View className="h-2/3">
            <View className="mx-4">
              <Header
                handleSearch={handleSearch}
                toggleSearch={toggleSearch}
                setToggleSearch={setToggleSearch}
              />
            </View>
            {current && (
              <View className={'flex-1 items-center'}>
                <View className="items-center justify-between h-20 w-full flex-row px-4">
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-xl font-bold text-black text-center">
                      {location?.name}
                    </Text>
                    <Text className="text-xs font-normal text-black text-center">
                      {location?.country}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 items-center justify-center">
                  <Text className="font-medium text-black text-6xl align-middle text-center">
                    {`${roundOff(current.temp_c)} °C`}
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Image
                    source={{uri: `https:${current.condition.icon}`}}
                    className="w-12 h-12"
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                  <Text className="font-normal capitalize text-black text-md">
                    {`${current.condition.text}`}
                  </Text>
                  <View className="h-[0.5px] w-12 rounded-full bg-black my-2" />
                  <Text className="font-normal capitalize text-black text-md">
                    {getMaxAndMinTempOfDay()}
                  </Text>
                </View>
                <View className="flex-1 flex-col items-center justify-center">
                  <View className="items-center justify-evenly flex-row w-full pb-8">
                    {current &&
                      infoChips.map((infoChip: TInfoChip) => (
                        <InfoChip
                          key={`info_chip_${infoChip.id}`}
                          data={infoChip}
                          current={current}
                        />
                      ))}
                  </View>
                  <View className="h-1 w-6 rounded-full bg-black" />
                </View>
              </View>
            )}
            {toggleSearch && locations && locations.length > 0 && (
              <LocationSelector
                locations={locations}
                handleLocation={handleLocation}
              />
            )}
          </View>
          <View className="h-1/3 flex-col items-center justify-center">
            <View className="flex-1 items-center justify-center">
              {location && location.localtime_epoch && (
                <Text className="font-semibold text-black text-lg align-middle text-center">
                  {formatDate(location.localtime_epoch, location.tz_id)}
                </Text>
              )}
            </View>
            {location && forecast && forecast.forecastday.length > 0 && (
              <>
                <Text className="text-sm">5-hour forecast</Text>
                <View className="flex-1 flex-row items-center justify-evenly">
                  {getForecastHours().map(hour => (
                    <ForecastTile
                      key={`hour_${hour.time_epoch}`}
                      hour={hour}
                      timezone={location.tz_id}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

export default Home;
