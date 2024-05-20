import React from 'react';
import {render} from '@testing-library/react-native';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {Splash} from '../../src/screens';
import {ROUTES} from '../../src/helpers/constants';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: jest.fn(),
  }),
  CommonActions: {
    navigate: jest.fn(),
  },
}));

describe('<Splash />', () => {
  it('navigates to home after 2 seconds', async () => {
    jest.useFakeTimers();

    const {getByText} = render(
      <NavigationContainer>
        <Splash />
      </NavigationContainer>,
    );

    // Should display the "Global" text
    expect(getByText('Global')).toBeTruthy();

    // Fast-forward time
    jest.advanceTimersByTime(2000);

    // Ensure navigation to home was dispatched after 2 seconds
    expect(CommonActions.navigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
