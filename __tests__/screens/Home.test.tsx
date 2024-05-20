import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import Home from '../../src/screens/home';
import {TEST_IDS} from '../../src/helpers/constants';
import {WindDir} from '../../src/helpers/types';

jest.mock('../../src/hooks/useWeather', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    location: {
      name: 'New York',
      country: 'United States of America',
      localtime_epoch: 1711454123,
      tz_id: 'America/New_York',
    },
    current: {
      temp_c: 25,
      condition: {
        text: 'Clear',
      },
    },
    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_c: 25,
            mintemp_c: 12,
          },
          hour: [
            {
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
            },
          ],
        },
      ],
    },
    getWeatherForecast: jest.fn(),
  })),
}));

jest.mock('../../src/hooks/useLocation', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    locations: [
      {
        name: 'Miami',
      },
      {
        name: 'California',
      },
    ],
    reset: jest.fn(),
  })),
}));

describe('<Home />', () => {
  it('renders home screen with weather information', async () => {
    const {getByText, getByTestId} = render(<Home />);

    expect(getByText('New York')).toBeTruthy();
    expect(getByText('United States of America')).toBeTruthy();
    expect(getByText('25 °C')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
    expect(getByText('5-hour forecast')).toBeTruthy();

    const toggleButton = getByTestId(TEST_IDS.SEARCH_BUTTON);
    fireEvent.press(toggleButton);

    await waitFor(() => {
      expect(getByText('Miami')).toBeTruthy();
      expect(getByText('California')).toBeTruthy();
    });
  });
});
