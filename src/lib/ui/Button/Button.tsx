import type { TButtonStyling } from '@app/lib/types';
import { EButtonHeight, type TRouterLink } from '@app/lib/types';
import {
  EnumWeight,
  type IButton,
  type TButtonProps,
  type TCustomButtonVariant
} from '@app/lib/types';
import { type ButtonProps } from '@mui/material';
import { Theme } from '@app/lib/general';
import { StyledButton } from './Button.styles';

interface ButtonComponentProps extends ButtonProps {
  to?: string;
  RouterLink?: TRouterLink;
  customVariant?: TCustomButtonVariant;
}

const primaryButtonBaseProps: IButton = {
  buttonProps: {
    variant: 'contained'
  },
  styling: {
    $fontFamily: Theme.fontFamilies.Roboto,
    $fontStyle: 'normal'
  }
};

const secondaryButtonBaseProps: IButton = {
  buttonProps: {
    variant: 'outlined'
  },
  styling: {
    $fontFamily: Theme.fontFamilies.Roboto,
    $fontStyle: 'normal'
  }
};

const terciaryButtonBaseProps: IButton = {
  buttonProps: {
    variant: 'text'
  },
  styling: {
    $fontFamily: Theme.fontFamilies.Roboto,
    $fontStyle: 'normal'
  }
};

const commonSxStylesM: TButtonStyling = {
  $height: EButtonHeight.MEDIUM,
  $padding: '4px 16px',
  $boxShadow: 'none',
  $gap: '3px',
  $borderRadius: '2px',
  $textTransform: 'none'
};

const commonSxStylesS: TButtonStyling = {
  $height: EButtonHeight.SMALL,
  $padding: '4px 8px',
  $boxShadow: 'none',
  $gap: '3px',
  $borderRadius: '2px',
  $textTransform: 'none'
};

const buttonVariants: TButtonProps<TCustomButtonVariant> = {
  'primary-m': {
    buttonProps: {
      ...primaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...primaryButtonBaseProps.styling,
      ...commonSxStylesM,
      $width: 'fit-content',
      $backgroundColor: Theme.palette.primary.azur
    }
  },
  'primary-m-full-width': {
    buttonProps: {
      ...primaryButtonBaseProps.buttonProps,
      disableElevation: true,
      fullWidth: true
    },
    styling: {
      ...commonSxStylesM,
      $backgroundColor: Theme.palette.primary.azur
    }
  },
  'primary-s': {
    buttonProps: {
      ...primaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesS,
      $width: 'fit-content',
      $backgroundColor: Theme.palette.primary.azur
    }
  },
  'secondary-m': {
    buttonProps: {
      ...secondaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesM,
      $borderColor: Theme.palette.primary.azur,
      $color: Theme.palette.primary.azur,
      $width: 'fit-content',
      $backgroundColor: Theme.palette.primary.snow
    }
  },
  edit: {
    buttonProps: {
      ...secondaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesS,
      $borderColor: Theme.palette.primary.azur,
      $color: Theme.palette.primary.azur,
      $width: 'fit-content',
      $minWidth: '86px',
      $justifyItems: 'center',
      $backgroundColor: Theme.palette.primary.snow
    }
  },
  'secondary-s': {
    buttonProps: {
      ...secondaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesS,
      $borderColor: Theme.palette.primary.azur,
      $color: Theme.palette.primary.azur,
      $width: 'fit-content',
      $backgroundColor: Theme.palette.primary.snow
    }
  },
  'terciary-m': {
    buttonProps: {
      ...terciaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesM,
      $color: Theme.palette.primary.azur,
      $width: 'fit-content'
    }
  },
  'terciary-s': {
    buttonProps: {
      ...terciaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesS,
      $color: Theme.palette.primary.azur,
      $width: 'fit-content'
    }
  },
  'header-menu': {
    buttonProps: {
      ...terciaryButtonBaseProps.buttonProps,
      color: 'inherit',
      disableElevation: true
    },
    styling: {
      ...commonSxStylesM,
      $width: 'fit-content',
      $fontSize: Theme.fontSizes.body.m,
      $fontWeight: EnumWeight.normal,
      $isHeaderMenuButton: true
    }
  },
  'header-menu-drawer': {
    buttonProps: {
      ...terciaryButtonBaseProps.buttonProps,
      disableElevation: true
    },
    styling: {
      ...commonSxStylesM,
      $display: 'block',
      $color: Theme.palette.primary.snow,
      $width: '100%',
      $padding: '6px 24px',
      $fontSize: Theme.fontSizes.body.s,
      $isDrawerMenuButton: true
    }
  }
};

export default function ButtonComponent({
  customVariant = 'primary-m',
  children,
  to,
  startIcon,
  endIcon,
  disabled,
  RouterLink,
  ...restProps
}: ButtonComponentProps) {
  const props = buttonVariants[customVariant];
  const routerProps = to && RouterLink ? { to, component: RouterLink } : {};

  return (
    <StyledButton
      disabled={disabled}
      endIcon={endIcon}
      startIcon={startIcon}
      {...props.buttonProps}
      {...props.styling}
      {...restProps}
      {...routerProps}
    >
      {children}
    </StyledButton>
  );
}
