import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('<App />', () => {
  test('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('1Global')).toBeTruthy();
  });
});
