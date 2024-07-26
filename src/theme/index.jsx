import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
// import { typography } from './typography';
import { customShadows } from './custom-shadows';
import IranSans from '../fonts/woff2/IRANSansXFaNum-Medium.woff2';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      direction: 'rtl',
      palette: palette(),
      // typography,
      
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
      typography: {
        fontFamily: 'IranSans',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'IranSans';
              src: local('IranSans'), url(${IranSans}) format('woff2');
              font-style: normal;
              font-weight: 500;
              font-display: swap;
            }
          `,
        },
      },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};