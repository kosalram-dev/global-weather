import {StyleSheet} from 'react-native';

import {TPalette} from '../../helpers/types';

const createStyles = (colors: TPalette) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.brandTint,
    },
  });

export default createStyles;
