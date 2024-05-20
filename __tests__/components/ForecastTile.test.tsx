import React from 'react';
import {render} from '@testing-library/react-native';
import {ForecastTile} from '../../src/components';
import {Hour, WindDir} from '../../src/helpers/types';
import {TEST_IDS} from '../../src/helpers/constants';

const mockHour: Hour = {
  time_epoch: 1621458969,
  time: '2021-05-20 17:16',
  temp_c: 25,
  temp_f: 77,
  is_day: 1,
  condition: {
    text: 'Partly cloudy',
    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    code: 1003,
  },
  wind_mph: 5.6,
  wind_kph: 9,
  wind_degree: 210,
  wind_dir: WindDir.N,
  pressure_mb: 1013,
  pressure_in: 30.4,
  precip_mm: 0,
  precip_in: 0,
  snow_cm: 0,
  humidity: 50,
  cloud: 50,
  feelslike_c: 25,
  feelslike_f: 77,
  windchill_c: 25,
  windchill_f: 77,
  heatindex_c: 25,
  heatindex_f: 77,
  dewpoint_c: 15,
  dewpoint_f: 59,
  will_it_rain: 0,
  chance_of_rain: 0,
  will_it_snow: 0,
  chance_of_snow: 0,
  vis_km: 10,
  vis_miles: 6,
  gust_mph: 9.2,
  gust_kph: 14.8,
  uv: 5,
};

// Mock timezone
const mockTimezone = 'America/New_York';

describe('ForecastTile component', () => {
  test('renders ForecastTile component with correct data', () => {
    const {getByText, getByTestId} = render(
      <ForecastTile hour={mockHour} timezone={mockTimezone} />,
    );

    // Check if temperature is rendered correctly
    const tempElement = getByText('25°C');
    expect(tempElement).toBeTruthy();

    // Check if image is rendered correctly
    const imageElement = getByTestId(TEST_IDS.FORECAST_ICON);
    expect(imageElement).toBeTruthy();

    // Check if time is rendered correctly
    const timeElement = getByText('05:16 PM');
    expect(timeElement).toBeTruthy();
  });
});
