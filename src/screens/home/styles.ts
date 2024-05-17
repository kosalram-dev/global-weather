import {StyleSheet} from 'react-native';

import {TPalette} from '../../helpers/types';

const createStyles = (colors: TPalette) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: colors.white,
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.brandTint,
    },
  });

export default createStyles;
