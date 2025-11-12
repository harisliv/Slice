import type { FC } from 'react';
import { Fragment, useState } from 'react';
import { OptionsVerticleIcon } from '@app/lib/icons';
import { StyledIconButton, StyledMenu, StyledTitle } from './Menu.styles';
import type { IMenu } from './Menu.types';
import ButtonComponent from '../Button';

const Menu: FC<IMenu> = ({ title, options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (runAction: () => void) => {
    handleClose();
    runAction();
  };

  return (
    <Fragment>
      <StyledIconButton onClick={handleClick}>
        <OptionsVerticleIcon />
        <StyledTitle>{title}</StyledTitle>
      </StyledIconButton>
      <StyledMenu
        data-testid="menu-list-items"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        {options?.map((option) => (
          <ButtonComponent
            customVariant="terciary-m"
            key={`${option.text}-${option.value}`}
            onClick={() => handleItemClick(option.onItemClick)}
            aria-label={option.value}
            aria-controls="buttons"
            data-testid={`${option.text}`}
            startIcon={option.icon}
          >
            {option.text}
          </ButtonComponent>
        ))}
      </StyledMenu>
    </Fragment>
  );
};

export default Menu;
