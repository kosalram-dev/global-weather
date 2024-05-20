import {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';

import {ENDPOINTS} from '../helpers/constants';
import {TLocation} from '../helpers/types';
import apiCall from '../helpers/apiHelper';

export const DEFAULT_FORECAST_DAY = 2;
export const DEFAULT_FORECAST_HOUR = 5;

const useLocation = (query: string) => {
  const [data, setData] = useState<TLocation[] | null>(null);

  const getLocations = useCallback(async () => {
    const result = await apiCall(
      `${Config.BASE_URL}${ENDPOINTS.GET_LOCATIONS}?q=${query}&key=${Config.WEATHER_API_KEY}`,
    );
    setData(result);
  }, [query]);

  const retry = () => {
    getLocations();
  };

  const reset = () => {
    setData(null);
  };

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return {
    locations: data,
    retry,
    reset,
  };
};

export default useLocation;
