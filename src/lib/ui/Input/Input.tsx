import { Grid2, InputAdornment } from '@mui/material';
import type { FC } from 'react';
import { AlertTriangleIcon } from '@app/lib/icons';
import { Theme } from '@app/lib/general';
import { StyledTextField, WrapperIcon } from './Input.styles';
import { gridSizeMap, type IInputBase } from '@app/lib/types';

const InputBase: FC<IInputBase> = ({
  icon,
  error,
  rightIcon = false,
  showErrorIcon = true,
  focusOnMount = false,
  integer = false,
  istextArea,
  rightAdornment,
  keyboardEventsEnabled = true,
  label,
  required,
  labelFontSize = 's',
  enableLabel = true,
  customGridSize = 'full',
  ...restProps
}) => {
  const getInputProps = () => {
    if (istextArea) {
      return {
        type: 'textarea',
        multiline: true,
        rows: 3
      };
    }
    if (restProps.type === 'number') {
      return {
        type: 'number'
      };
    }
    return {
      type: 'input'
    };
  };

  const inputProps = getInputProps();

  return (
    <Grid2 container>
      <Grid2 size={gridSizeMap[customGridSize]}>
        <StyledTextField
          fullWidth
          {...restProps}
          {...inputProps}
          label={label}
          required={required}
          variant="outlined"
          error={error}
          $hasResize={istextArea}
          multiline={istextArea}
          slotProps={{
            input: {
              startAdornment: icon && !rightIcon && (
                <InputAdornment
                  position="start"
                  data-testid={'input.adornment-start'}
                >
                  <WrapperIcon
                    $error={error}
                    data-testid={'input.wrapper-icon-start'}
                  >
                    {icon}
                  </WrapperIcon>
                </InputAdornment>
              ),
              endAdornment: ((icon && rightIcon) ||
                (error && showErrorIcon) ||
                rightAdornment) && (
                <InputAdornment
                  position="end"
                  data-testid={'input.adornment-end'}
                >
                  {rightAdornment}
                  {error && showErrorIcon && (
                    <WrapperIcon
                      $error={error}
                      data-testid={'input.wrapper-icon-end'}
                      className="wrapper-icon-end"
                    >
                      {error && showErrorIcon ? (
                        <AlertTriangleIcon
                          fill={Theme.palette.secondary.errorPink}
                        />
                      ) : (
                        icon
                      )}
                    </WrapperIcon>
                  )}
                </InputAdornment>
              )
            }
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default InputBase;
