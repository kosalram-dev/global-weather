import React from 'react';
import {render} from '@testing-library/react-native';
import {InfoChip} from '../../src/components';
import {Current, TInfoChip, WindDir} from '../../src/helpers/types';

const MOCK_INFOCHIP_DATA: TInfoChip = {
  id: 1002,
  image: 'image-url',
  title: 'Humidity',
  key: 'humidity',
  unit: '%',
};

const mockCurrentData: Current = {
  last_updated_epoch: 1621458969,
  last_updated: '2021-05-20 15:56',
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
  humidity: 50,
  cloud: 50,
  feelslike_c: 25,
  feelslike_f: 77,
  vis_km: 10,
  vis_miles: 6,
  uv: 5,
  gust_mph: 9.2,
  gust_kph: 14.8,
};

describe('InfoChip component', () => {
  test('renders InfoChip component with correct data', () => {
    const {getByText} = render(
      <InfoChip data={MOCK_INFOCHIP_DATA} current={mockCurrentData} />,
    );

    const titleElement = getByText('Humidity');
    expect(titleElement).toBeTruthy();

    const currentDataElement = getByText('50 %');
    expect(currentDataElement).toBeTruthy();
  });
});
