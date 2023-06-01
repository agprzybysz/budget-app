import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const StyledButton = styled(MuiButton)({
  borderRadius: '4px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '22px',
  marginRight: '10px',
  textTransform: 'none',
  '&.MuiButton-containedPrimary': {
    backgroundColor: '#334ACC',
    color: '#FFFFFF',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#223289',
      color: '#E8EAF6',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#223289',
      color: '#E8EAF6',
    },
    '&:disabled': {
      backgroundColor: 'rgba(51, 51, 51, 0.07)',
      color: 'rgba(51, 51, 51, 0.25)',
    },
  },
  '&.MuiButton-containedError': {
    backgroundColor: '#FCECE6',
    color: '#FF5D5D',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#FF5D5D',
      color: '#FFFFFF',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#FCECE6',
      color: '#FF5D5D',
    },
    '&:disabled': {
      backgroundColor: 'rgba(51, 51, 51, 0.07)',
      color: 'rgba(51, 51, 51, 0.25)',
    },
  },
  '&.MuiButton-containedSuccess': {
    backgroundColor: '#DBEBDB',
    color: '#00A980',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#00A980',
      color: '#FFFFFF',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#DBEBDB',
      color: '#00A980',
    },
    '&:disabled': {
      backgroundColor: 'rgba(51, 51, 51, 0.07)',
      color: 'rgba(51, 51, 51, 0.25)',
    },
  },
  '&.MuiButton-containedWarning': {
    backgroundColor: '#FFF5D2',
    color: '#B28C09',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#FFA726',
      color: '#FFFFFF',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#FFF5D2',
      color: '#B28C09',
    },
    '&:disabled': {
      backgroundColor: 'rgba(51, 51, 51, 0.07)',
      color: 'rgba(51, 51, 51, 0.25)',
    },
  },
  '&.MuiButton-outlinedPrimary': {
    backgroundColor: '#E8EAF6',
    color: '#334ACC',
    borderColor: '#E8EAF6',
    '&:hover': {
      backgroundColor: '#C5CAE9',
      color: '#223289',
    },
    '&:active': {
      backgroundColor: '#C5CAE9',
      color: '#223289',
    },
    '&:disabled': {
      backgroundColor: 'rgba(51, 51, 51, 0.07)',
      color: 'rgba(51, 51, 51, 0.25)',
      borderColor: 'rgba(51, 51, 51, 0.07)',
    },
  },
  '&.MuiButton-outlinedError': {
    backgroundColor: '#FFFFFF',
    color: '#FF5D5D',
    border: '1px solid #FF5D5D',
    '&:hover': {
      backgroundColor: '#FDE8E0',
      color: '#FF5D5D',
    },
    '&:active': {
      backgroundColor: '#FDE8E0',
      color: '#FF5D5D',
    },
    '&:disabled': {
      backgroundColor: '#FFFFFF',
      color: 'rgba(51, 51, 51, 0.25)',
      borderColor: '#FFFFFF',
    },
  },
  '&.MuiButton-outlinedSuccess': {
    backgroundColor: '#FFFFFF',
    color: '#00A980',
    border: '1px solid #66BB6A',
    '&:hover': {
      backgroundColor: '#DBEBDB',
      color: '#00A980',
    },
    '&:active': {
      backgroundColor: '#DBEBDB',
      color: '#00A980',
    },
    '&:disabled': {
      backgroundColor: '#FFFFFF',
      color: 'rgba(51, 51, 51, 0.25)',
      borderColor: '#FFFFFF',
    },
  },
  '&.MuiButton-outlinedWarning': {
    backgroundColor: '#FFFFFF',
    color: '#FFA726',
    border: '1px solid #FFA726',
    '&:hover': {
      backgroundColor: '#FFF5D2',
      color: '#FFA726',
    },
    '&:active': {
      backgroundColor: '#FFF5D2',
      color: '#FFA726',
    },
    '&:disabled': {
      backgroundColor: '#FFFFFF',
      color: 'rgba(51, 51, 51, 0.25)',
      borderColor: '#FFFFFF',
    },
  },
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
      onClick={() => console.log('clicked')}
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
