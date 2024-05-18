import React, {FunctionComponent, useCallback} from 'react';
import {StatusBar} from 'react-native';

import {Header} from '../../components';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
} from '../../components/rn-styled';
import useWeather from '../../hooks/useWeather';

import ClearSky from '../../assets/clear_sky.jpeg';
import CloudSky from '../../assets/cloudy_sky.jpeg';
import Rain from '../../assets/rain.jpeg';

import Humidity from '../../assets/humidity.png';
import Wind from '../../assets/wind.png';
import Precipitation from '../../assets/weather.png';

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
      return `${forecast.forecastday[0].day.maxtemp_c.toFixed(
        0,
      )}° / ${forecast.forecastday[0].day.mintemp_c.toFixed(0)}°`;
    }
  }, [forecast]);

  const getForecastHours = useCallback(() => {
    if (location && forecast && forecast.forecastday.length > 0) {
      const futureForecasts = forecast.forecastday[0].hour
        .filter(hour => {
          return hour.time_epoch > location.localtime_epoch;
        })
        .splice(1, 5);
      return futureForecasts;
    }

    return [];
  }, [forecast, location]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const utcDay = date.getDate();
    const utcMonth = date.getMonth() + 1;
    const utcYear = date.getFullYear();

    const utcDayName = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    // Format the date components with leading zeros if needed
    const day = String(utcDay).padStart(2, '0');
    const month = String(utcMonth).padStart(2, '0');
    const year = utcYear;

    // Return the formatted date string
    return `${utcDayName}, ${day}.${month}.${year}`;
  };

  const formatAndGetHour = (timestamp: number) =>
    new Date(timestamp * 1000).getUTCHours();

  return (
    <ImageBackground
      blurRadius={90}
      source={getBackgroundImage(current?.condition.text)}
      className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        source={getBackgroundImage(current?.condition.text)}
        className="absolute w-full h-2/3 rounded-[60px]"
      />
      <SafeAreaView className="flex-1 flex-col">
        <View className="h-2/3">
          <Header
            title={location?.name || ''}
            subtitle={location?.country || ''}
          />
          <View className={'flex-1 items-center'}>
            <View className="flex-1 items-center justify-center">
              <Text className="font-medium text-black text-6xl align-middle text-center">
                {`${current?.temp_c.toFixed(0)} °C`}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Image
                source={{uri: `https:${current?.condition.icon}`}}
                className="w-12 h-12"
                resizeMode="contain"
                resizeMethod="resize"
              />
              <Text className="font-normal capitalize text-black text-md">
                {`${current?.condition.text}`}
              </Text>
              <View className="h-[0.5px] w-12 rounded-full bg-black my-2" />
              <Text className="font-normal capitalize text-black text-md">
                {getMaxAndMinTempOfDay()}
              </Text>
            </View>
            <View className="flex-1 flex-col items-center justify-center">
              <View className="items-center justify-evenly flex-row w-full pb-8">
                <View className="flex-1 items-center">
                  <Image
                    source={Humidity}
                    className="w-6 h-6"
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                  <View className="mt-2 h-[0.5px] w-12 rounded-full bg-black" />
                  <Text className="font-normal capitalize text-black text-md py-2">
                    Humidity
                  </Text>
                  <Text className="font-normal capitalize text-black text-md">
                    {`${current?.humidity} %`}
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Image
                    source={Wind}
                    className="w-6 h-6"
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                  <View className="mt-2 h-[0.5px] w-12 rounded-full bg-black" />
                  <Text className="font-normal capitalize text-black text-md py-2">
                    Wind now
                  </Text>
                  <Text className="font-normal capitalize text-black text-md">
                    {`${current?.wind_kph} kmph`}
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Image
                    source={Precipitation}
                    className="w-6 h-6"
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                  <View className="mt-2 h-[0.5px] w-12 rounded-full bg-black" />
                  <Text className="font-normal capitalize text-black text-md py-2">
                    Precipitation
                  </Text>
                  <Text className="font-normal capitalize text-black text-md">
                    {`${current?.precip_in} %`}
                  </Text>
                </View>
              </View>
              <View className="h-1 w-6 rounded-full bg-black" />
            </View>
          </View>
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
                  <View
                    key={`hour_${hour.time_epoch}`}
                    className="flex-1 items-center justify-center bg-[#ffffff22] rounded-xl mx-2 py-2">
                    <Text className="text-xs">{`${hour.temp_c.toFixed(
                      0,
                    )}°C`}</Text>
                    <Image
                      source={{uri: `https:${hour.condition.icon}`}}
                      className="w-12 h-12"
                      resizeMode="contain"
                      resizeMethod="resize"
                    />
                    <Text className="text-xs">{`${formatAndGetHour(
                      hour.time_epoch,
                    )}:00`}</Text>
                  </View>
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
