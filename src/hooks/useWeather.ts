import {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';

import {ENDPOINTS} from '../helpers/constants';
import {Weather} from '../helpers/types';
import apiCall from '../helpers/apiHelper';

export const DEFAULT_FORECAST_DAY = 2;
export const DEFAULT_FORECAST_HOUR = 5;
export const DEFAULT_LOCATION = 'Chicago';

const useWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Weather | null>(null);

  const getWeatherForecast = useCallback(async (query: string) => {
    setLoading(true);
    const result = await apiCall(
      `${Config.BASE_URL}${ENDPOINTS.GET_WEATHER_FORECAST}?q=${query}&days=${DEFAULT_FORECAST_DAY}&key=${Config.WEATHER_API_KEY}`,
    );
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    getWeatherForecast(DEFAULT_LOCATION);
  }, [getWeatherForecast]);

  return {
    ...data,
    loading,
    getWeatherForecast,
  };
};

export default useWeather;
