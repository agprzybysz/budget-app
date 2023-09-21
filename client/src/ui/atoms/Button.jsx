import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const StyledButton = styled(MuiButton)({
  'span.MuiButton-startIcon, span.MuiButton-endIcon': {
    margin: 0,
  },
  '&.button-icononly': {
    minWidth: '28px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  '&.button-iconright': {
    paddingRight: '8px',
    paddingLeft: '22px',
  },
  '&.button-iconright svg': {
    marginLeft: '4px',
  },
  '&.button-iconleft': {
    paddingRight: '12px',
    paddingLeft: '8px',
  },
  '&.button-iconleft svg': {
    marginRight: '4px',
  },
});

export function Button({ children, variant, color, disabled, size, ...props }) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      disabled={disabled}
      size={size}
      //onClick={() => console.log('clicked')}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined']),
  color: PropTypes.oneOf(['primary', 'error', 'success', 'warning']),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  disabled: PropTypes.bool,
};
