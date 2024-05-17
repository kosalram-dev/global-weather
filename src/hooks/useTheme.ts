import {useColorScheme} from 'react-native';

import {TPalette} from '../helpers/types';

const darkTheme: TPalette = {
  brandTint: '#0439d7',

  black: '#000',
  white: '#FFF',
  danger: '#DC362E',
  paperBackground: 'rgba(255, 255, 255, 0.75)',
  transparent: 'transparent',
};

const lightTheme: TPalette = {
  brandTint: '#0439d7',

  black: '#000',
  white: '#FFF',
  danger: '#DC362E',
  paperBackground: 'rgba(255, 255, 255, 0.75)',
  transparent: 'transparent',
};

const useTheme = (): {colors: TPalette} => {
  const theme = useColorScheme();

  return {
    colors: theme === 'dark' ? darkTheme : lightTheme,
  };
};

export default useTheme;
