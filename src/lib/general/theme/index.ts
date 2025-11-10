import { createTheme } from '@mui/material/styles';
import '@app/lib/types';
import type { DefaultTheme } from 'styled-components';

export const Theme: DefaultTheme = {
  palette: {
    primary: {
      azur: '#4169E2',
      ocean: '#191970',
      darkerGrey: '#424245',
      snow: '#FFFFFF'
    },
    secondary: {
      darkGrey: '#636365',
      lightGreen: '#00949F',
      errorPink: '#93005F',
      successGreen: '#188250',
      warningOrange: '#D43900',
      indicatorOrange: '#FF9770',
      informationBlue: '#1E8BC3',
      amber: '#D08404',
      informationBlue20: '#D2E8F3',
      ocean12: '#EDE8E2',
      darkerGrey36: '#BBBBBC'
    },
    error: {
      errorPink: '#93005F',
      errorPinkLight: '#FDFAFC'
    },
    background: {
      grey: '#E8E8E9',
      lightGrey: '#F5F7F6',
      azur4: '#F7F9FE',
      azur8: '#F0F3FD',
      azur16: '#E1E7FA'
    },
    azur: {
      azur4: '#F7F9FE',
      azur8: '#F0F3FD',
      azur16: '#E1E7FA',
      azur30: '#C6D2F6',
      azur60: '#8DA5EE',
      azur80: '#6787E8',
      azur130: '#2D56D3',
      azur160: '#2D4DAE',
      azur180: '#233F93'
    },
    ocean: {
      ocean4: '#F6F6F9',
      ocean8: '#EDEDF4',
      ocean12: '#EDE8E2',
      ocean16: '#DADAE8',
      ocean30: '#BABAD4',
      ocean70: '#5E5E9B',
      ocean90: '#30307E',
      ocean130: '#13135F',
      ocean160: '#0E0E4D',
      ocean180: '#0A0A3B'
    },
    darkerGrey: {
      darkerGrey2: '#FCFCFC',
      darkerGrey4: '#F7F7F8',
      darkerGrey8: '#F0F0F0',
      darkerGrey12: '#E8E8E9',
      darkerGrey36: '#BBBBBC',
      darkerGrey60: '#8E8E8F',
      darkerGrey80: '#68686A',
      darkerGrey130: '#38373A',
      darkerGrey160: '#2D2C2E',
      darkerGrey180: '#222123'
    },
    darkGrey: {
      darkGrey4: '#F9F9F9',
      darkGrey8: '#F3F3F3',
      darkGrey16: '#E6E6E6',
      darkGrey30: '#D0D0D1',
      darkGrey60: '#A1A1A3',
      darkGrey80: '#828284',
      darkGrey130: '#535354',
      darkGrey160: '#434243',
      darkGrey180: '#323133'
    },
    lightGreen: {
      lightGreen2: '#FAFDFD',
      lightGreen4: '#F5FBFB',
      lightGreen8: '#EBF6F7',
      lightGreen16: '#D6EEF0',
      lightGreen30: '#B2DFE2',
      lightGreen60: '#66BFC5',
      lightGreen80: '#33A9B2',
      lightGreen130: '#007E88',
      lightGreen160: '#00676F',
      lightGreen180: '#004F55'
    },
    errorPink: {
      errorPink2: '#FDFAFC',
      errorPink8: '#F6EBF2',
      errorPink16: '#EED6E5',
      errorPink30: '#DFB2CF',
      errorPink60: '#BE669F',
      errorPink80: '#A9337F',
      errorPink130: '#7D0050',
      errorPink160: '#670041',
      errorPink180: '#4F0031'
    },
    successGreen: {
      successGreen2: '#FAFDFB',
      successGreen8: '#EDF5F1',
      successGreen16: '#DAEBE3',
      successGreen30: '#BAD9CA',
      successGreen60: '#74B496',
      successGreen80: '#469B73',
      successGreen130: '#126E43',
      successGreen160: '#0D5A36',
      successGreen180: '#084528'
    },
    warningOrange: {
      warningOrange2: '#FEFBFA',
      warningOrange8: '#FCEFEB',
      warningOrange16: '#F8DFD6',
      warningOrange30: '#F2C4B2',
      warningOrange60: '#E58866',
      warningOrange80: '#DD6133',
      warningOrange130: '#B52E00',
      warningOrange160: '#942300',
      warningOrange180: '#711900'
    },
    informationBlue: {
      informationBlue2: '#F8FDFE',
      informationBlue8: '#EDF6FA',
      informationBlue16: '#DBECF5',
      informationBlue20: '#D2E8F3',
      informationBlue30: '#BBDCED',
      informationBlue60: '#78B9DB',
      informationBlue80: '#4BA2CF',
      informationBlue130: '#1675A6',
      informationBlue160: '#0F5E87',
      informationBlue180: '#094767'
    },
    ambar: {
      ambar2: '#FEFDFA',
      ambar8: '#FBF5EB',
      ambar16: '#F7EBD7',
      ambar30: '#F1DAB4',
      ambar60: '#E3B568',
      ambar80: '#D99D36',
      ambar130: '#B16F00',
      ambar160: '#915A00',
      ambar180: '#6F4400'
    },
    controlsAndStatus: {
      hoverBlue: '#3251B2',
      disabled: '#BBBBBC',
      unselected: '#5E5E9B'
    }
  },
  fontSizes: {
    headings: {
      h1: '28px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      h5: '16px'
    },
    body: {
      l: '18px',
      m: '16px',
      s: '14px',
      xs: '13px'
    },
    links: {
      m: '16px',
      s: '14px'
    }
  },
  fontFamilies: {
    Lora: "'Lora', serif",
    Roboto: "'Roboto', sans-serif"
  },
  breakpoints: {
    xxs: 480,
    xs: 568,
    sm: 768,
    md: 1024,
    lg: 1200,
    xl: 1440,
    xxl: 1600
  },
  elevations: {
    small: '0px 1px 8px rgba(25, 25, 112, 0.12)',
    medium: '0px 4px 12px 4px rgba(25, 25, 112, 0.08)',
    big: '0px 4px 16px 8px rgba(25, 25, 112, 0.12)',
    tooltip:
      '-2px -2px 8px rgba(255, 255, 255, 0.32), 0px 4px 8px rgba(66, 66, 69, 0.12)'
  },
  headerNav: {
    height: '56px'
  },
  footerNav: {
    height: '64px',
    mobileHeight: '100px'
  },
  formActionBar: {
    height: '72px'
  }
};

export const muiDefaultTheme = createTheme({
  palette: {
    primary: {
      main: Theme.palette.primary.azur
    },
    secondary: {
      main: Theme.palette.primary.ocean
    },
    success: {
      main: Theme.palette.secondary.successGreen
    },
    error: {
      main: Theme.palette.secondary.errorPink
    },
    warning: {
      main: Theme.palette.secondary.warningOrange
    },
    info: {
      main: Theme.palette.primary.snow
    },
    background: {
      default: Theme.palette.background.lightGrey
    }
  },
  breakpoints: {
    values: Theme.breakpoints
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: `
            -2px 0px 4px rgba(0,0,0,0.05),
            2px 0px 4px rgba(0,0,0,0.05),
            0px 2px 4px rgba(0,0,0,0.07)
          `,
          '&:before': {
            display: 'none'
          }
        }
      }
    }
  }
});

export const animation = ({
  time,
  property = 'all',
  type = 'ease'
}: {
  time: string;
  property?: string;
  type?: string;
}) => `
  -webkit-transition: ${property} ${time} ${type};
  -moz-transition: ${property} ${time} ${type};
  -ms-transition: ${property} ${time} ${type};
  -o-transition: ${property} ${time} ${type};
  transition: ${property} ${time} ${type};
`;
