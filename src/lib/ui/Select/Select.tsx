import { type FC } from 'react';
import {
  StyledFormControl,
  StyledFormHelperText,
  StyledInput,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect
} from './Select.styles';
import { gridSizeMap, type ISelect, type Option } from '@app/lib/types';
import { Grid2, Skeleton } from '@mui/material';
import { ButtonComponent } from '@app/lib/ui';
import {
  StyledFooterBox,
  StyledFooterListItem
} from '../Multiselect/Multiselect.styles';

const Select: FC<ISelect> = ({
  label,
  name,
  required,
  disabled,
  readOnly,
  error,
  options = [],
  onSelectChange,
  handleClear,
  inputProps = {},
  noOptionsFallbackTitle = '',
  noOptionsFallbackSubtitle = '',
  helperText = '',
  customGridSize = 'full',
  loading,
  borderless = false,
  ...props
}) => {
  const NoOptionsContainer = (
    <div className="Select-NoOptions-container">
      <span>{noOptionsFallbackTitle}</span>
      <span>{noOptionsFallbackSubtitle}</span>
    </div>
  );

  const renderInputLabel = (
    <StyledInputLabel
      id={`${name}-label`}
      data-testid={'select.inputLabel'}
      required={required}
    >
      {label}
    </StyledInputLabel>
  );

  const handleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: Option
  ) => {
    event.stopPropagation();
    onSelectChange?.(option);
  };

  const renderOptions = () =>
    options.map((option, i) => (
      <StyledMenuItem
        key={`select-list-item-${i + 1}`}
        data-testid={`select.menuItem.${option.value}`}
        value={option.value}
        onClick={(event) => handleClick(event, option)}
        tabIndex={0}
      >
        <span data-testid={`select.menuItemText.${option.value}`}>
          {option.label}
        </span>
      </StyledMenuItem>
    ));

  return (
    <Grid2 container>
      <Grid2 size={gridSizeMap[customGridSize]}>
        <StyledFormControl
          fullWidth
          disabled={disabled}
          error={error && !disabled && !readOnly}
          data-testid="select.formControl"
        >
          {label && renderInputLabel}
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={48}
              sx={{ boarderRadius: '8px' }}
            />
          ) : (
            <StyledSelect
              {...props}
              fullWidth
              labelId={`${name}-label`}
              data-testid={'select'}
              MenuProps={{ keepMounted: true, disablePortal: true }}
              displayEmpty
              disabled={options.length === 0 || disabled}
              input={
                <StyledInput
                  name={name}
                  $borderless={borderless}
                  inputProps={{
                    ...inputProps,
                    'data-testid': 'select.input'
                  }}
                />
              }
              name={name}
              readOnly={readOnly}
            >
              {options.length === 0 ? NoOptionsContainer : renderOptions()}
              {handleClear && (
                <StyledFooterListItem>
                  <StyledFooterBox>
                    <ButtonComponent
                      onClick={() => handleClear()}
                      customVariant="secondary-s"
                    >
                      Clear
                    </ButtonComponent>
                  </StyledFooterBox>
                </StyledFooterListItem>
              )}
            </StyledSelect>
          )}
          {helperText && (
            <StyledFormHelperText>{helperText}</StyledFormHelperText>
          )}
        </StyledFormControl>
      </Grid2>
    </Grid2>
  );
};

export default Select;
