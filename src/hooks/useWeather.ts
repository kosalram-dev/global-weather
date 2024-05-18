import {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';

import {ENDPOINTS} from '../helpers/constants';
import {Weather} from '../helpers/types';

export const DEFAULT_FORECAST_DAY = 1;

const useWeather = (query: string) => {
  const [data, setData] = useState<Weather | null>(null);

  const getWeatherForecast = useCallback(() => {
    fetch(
      `${Config.BASE_URL}${ENDPOINTS.GET_WEATHER_FORECAST}?q=${query}&days=${DEFAULT_FORECAST_DAY}&key=${Config.WEATHER_API_KEY}`,
    )
      .then(res => res.json())
      .then(result => {
        setData(result);
        // console.log('+=====result=====', result);
      })
      .catch(error => {
        console.log('+=====error=====', error);
      });
  }, [query]);

  const retry = () => {
    getWeatherForecast();
  };

  useEffect(() => {
    getWeatherForecast();
  }, [getWeatherForecast]);

  return {
    ...data,
    retry,
  };
};

export default useWeather;
