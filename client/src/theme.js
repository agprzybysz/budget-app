import { createTheme } from '@mui/material';

let theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  palette: {
    text: {
      primary: '#333',
    },
    type: 'light',
    primary: {
      main: '#334ACC',
      dark: '#223289',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E8EAF6',
      dark: '#C5CAE9',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    error: {
      main: '#FF5D5D',
      light: '#FCECE6',
      dark: '#FDE8E0',
      contrastText: '#fff',
    },
    success: {
      main: '#00A980',
      light: '#DBEBDB',
      dark: '#66BB6A',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA726',
      light: '#FFF5D2',
      dark: '#B28C09',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F8F8',
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: '2.25rem',
      letterSpacing: '-0.1rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.074rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.728rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.44rem',
    },
    h5: {
      fontSize: '1.44rem',
    },
    h6: {
      fontSize: '1.44rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#333',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.grey['500'],
          ':hover': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            borderBottom: '2px solid #0666eb',
            color: theme.palette.primary.main,
          },
          '.MuiTypography-root': {
            fontWeight: '500',
            fontSize: '14px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#33333350',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '40px 32px',
          border: 'none',
          boxShadow: theme.shadows[3],
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '0',
          fontSize: '24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          height: '34px',
          fontWeight: '500',
          lineHeight: '22px',
          marginRight: '10px',
        },
        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: 'none',
          ':hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
            boxShadow: 'none',
          },
          ':active': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
          },
          ':disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
        },
        containedError: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
          boxShadow: 'none',
          ':hover': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            boxShadow: 'none',
          },
          ':active': {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
          },
          ':disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
          boxShadow: 'none',
          ':hover': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            boxShadow: 'none',
          },
          ':active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
          ':disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          boxShadow: 'none',
          ':hover': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            boxShadow: 'none',
          },
          ':active': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
          },
          ':disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
        },
        outlinedPrimary: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
          borderColor: theme.palette.secondary.main,
          ':hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
          },
          ':active': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
          },
          ':disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
            borderColor: 'rgba(51, 51, 51, 0.07)',
          },
        },
        outlinedError: {
          backgroundColor: theme.palette.error.contrastText,
          color: theme.palette.error.main,
          border: '1px solid theme.palette.error.main',
          ':hover': {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.error.main,
          },
          ':active': {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.error.main,
          },
          ':disabled': {
            backgroundColor: theme.palette.error.contrastTex,
            color: 'rgba(51, 51, 51, 0.25)',
            borderColor: theme.palette.error.contrastText,
          },
        },
        outlinedSuccess: {
          backgroundColor: theme.palette.success.contrastText,
          color: theme.palette.success.main,
          border: '1px solid theme.palette.success.dark',
          ':hover': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
          ':active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
          ':disabled': {
            backgroundColor: theme.palette.success.contrastText,
            color: 'rgba(51, 51, 51, 0.25)',
            borderColor: theme.palette.success.contrastText,
          },
        },
        outlinedWarning: {
          backgroundColor: theme.palette.warning.contrastText,
          color: theme.palette.warning.main,
          border: '1px solid theme.palette.warning.main',
          ':hover': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.main,
          },
          ':active': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.main,
          },
          ':disabled': {
            backgroundColor: theme.palette.warning.contrastText,
            color: 'rgba(51, 51, 51, 0.25)',
            borderColor: theme.palette.warning.contrastText,
          },
        },
      },
    },
  },
});

export { theme };
