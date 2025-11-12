import "@mui/system";
import "styled-components";

declare module "@mui/system" {
  interface BreakpointOverrides {
    xxs: true;
    xxl: true;
  }
}

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      primary: {
        azur: string;
        ocean: string;
        darkerGrey: string;
        snow: string;
      };
      secondary: {
        darkGrey: string;
        lightGreen: string;
        errorPink: string;
        successGreen: string;
        warningOrange: string;
        indicatorOrange: string;
        informationBlue: string;
        amber: string;
        informationBlue20: string;
        ocean12: string;
        darkerGrey36: string;
      };
      background: {
        grey: string;
        lightGrey: string;
        azur4: string;
        azur8: string;
        azur16: string;
      };
      error: {
        errorPink: string;
        errorPinkLight: string;
      };
      azur: {
        azur4: string;
        azur8: string;
        azur16: string;
        azur30: string;
        azur60: string;
        azur80: string;
        azur130: string;
        azur160: string;
        azur180: string;
      };
      ocean: {
        ocean4: string;
        ocean8: string;
        ocean12: string;
        ocean16: string;
        ocean30: string;
        ocean70: string;
        ocean90: string;
        ocean130: string;
        ocean160: string;
        ocean180: string;
      };
      darkerGrey: {
        darkerGrey2: string;
        darkerGrey4: string;
        darkerGrey8: string;
        darkerGrey12: string;
        darkerGrey36: string;
        darkerGrey60: string;
        darkerGrey80: string;
        darkerGrey130: string;
        darkerGrey160: string;
        darkerGrey180: string;
      };
      darkGrey: {
        darkGrey4: string;
        darkGrey8: string;
        darkGrey16: string;
        darkGrey30: string;
        darkGrey60: string;
        darkGrey80: string;
        darkGrey130: string;
        darkGrey160: string;
        darkGrey180: string;
      };
      lightGreen: {
        lightGreen2: string;
        lightGreen4: string;
        lightGreen8: string;
        lightGreen16: string;
        lightGreen30: string;
        lightGreen60: string;
        lightGreen80: string;
        lightGreen130: string;
        lightGreen160: string;
        lightGreen180: string;
      };
      errorPink: {
        errorPink2: string;
        errorPink8: string;
        errorPink16: string;
        errorPink30: string;
        errorPink60: string;
        errorPink80: string;
        errorPink130: string;
        errorPink160: string;
        errorPink180: string;
      };
      successGreen: {
        successGreen2: string;
        successGreen8: string;
        successGreen16: string;
        successGreen30: string;
        successGreen60: string;
        successGreen80: string;
        successGreen130: string;
        successGreen160: string;
        successGreen180: string;
      };
      warningOrange: {
        warningOrange2: string;
        warningOrange8: string;
        warningOrange16: string;
        warningOrange30: string;
        warningOrange60: string;
        warningOrange80: string;
        warningOrange130: string;
        warningOrange160: string;
        warningOrange180: string;
      };
      informationBlue: {
        informationBlue2: string;
        informationBlue8: string;
        informationBlue16: string;
        informationBlue20: string;
        informationBlue30: string;
        informationBlue60: string;
        informationBlue80: string;
        informationBlue130: string;
        informationBlue160: string;
        informationBlue180: string;
      };
      ambar: {
        ambar2: string;
        ambar8: string;
        ambar16: string;
        ambar30: string;
        ambar60: string;
        ambar80: string;
        ambar130: string;
        ambar160: string;
        ambar180: string;
      };
      controlsAndStatus: {
        hoverBlue: string;
        disabled: string;
        unselected: string;
      };
    };
    fontSizes: {
      headings: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
      };
      body: {
        // xl: string;
        l: string;
        m: string;
        s: string;
        xs: string;
      };
      links: {
        m: string;
        s: string;
      };
    };
    fontFamilies: {
      Lora: string;
      Roboto: string;
    };
    breakpoints: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    elevations: {
      small: string;
      medium: string;
      big: string;
      tooltip: string;
    };
    headerNav: {
      height: string;
    };
    footerNav: {
      height: string;
      mobileHeight: string;
    };
    formActionBar: {
      height: string;
    };
  }
}

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     lineHeight: {
//       setLineHeight: (height: string) => ReturnType;
//     };
//   }
// }
