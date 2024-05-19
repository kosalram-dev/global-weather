import React, {FunctionComponent, useCallback} from 'react';
import {StatusBar} from 'react-native';

import {Header, InfoChip, ForecastTile} from '../../components';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
} from '../../components/rn-styled';
import useWeather, {DEFAULT_FORECAST_HOUR} from '../../hooks/useWeather';
import {formatDate, roundOff} from '../../helpers/datetime-formatter';
import {TInfoChip} from '../../helpers/types';

import ClearSky from '../../assets/clear_sky.jpg';
import CloudSky from '../../assets/cloudy_sky.jpg';
import Rain from '../../assets/rain.jpg';

import Humidity from '../../assets/humidity.png';
import Wind from '../../assets/wind.png';
import Precipitation from '../../assets/weather.png';

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

const Home: FunctionComponent = () => {
  const {location, current, forecast} = useWeather('London');

  const getBackgroundImage = (value?: string) => {
    if (value) {
      value = value.toLowerCase();
    }
    switch (value) {
      case 'overcast':
      case 'partly cloudy':
        return CloudSky;
      case 'moderate rain at times':
      case 'mist':
      case 'light rain':
      case 'light rain shower':
      case 'patchy rain nearby':
      case 'rain':
        return Rain;
      case 'clear':
      case 'sunny':
      default:
        return ClearSky;
    }
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
      <StatusBar barStyle="light-content" />
      <Image
        source={getBackgroundImage(current?.condition.text)}
        className="absolute w-full h-2/3 rounded-[30px]"
      />
      <SafeAreaView className="flex-1 flex-col">
        <View className="h-2/3">
          <Header
            title={location?.name || ''}
            subtitle={location?.country || ''}
          />
          {current && (
            <View className={'flex-1 items-center'}>
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
        </View>
        <View className="h-1/3 flex-col items-center justify-center">
          <View className="flex-1 items-center justify-center">
            {location && location.localtime_epoch && (
              <Text className="font-semibold text-black text-lg align-middle text-center">
                {formatDate(location.localtime_epoch)}
              </Text>
            )}
          </View>
          {forecast && forecast.forecastday.length > 0 && (
            <>
              <Text className="text-sm">5-hour forecast</Text>
              <View className="flex-1 flex-row items-center justify-evenly">
                {getForecastHours().map(hour => (
                  <ForecastTile key={`hour_${hour.time_epoch}`} hour={hour} />
                ))}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
