import { createTheme } from '@mui/material/styles'

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#e50914',
      light: '#ff4444',
      dark: '#c40812',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0f0f0f',
    },
    background: {
      default: '#0f0f0f',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
    error: {
      main: '#e50914',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3em',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5em',
      fontWeight: 800,
    },
    h3: {
      fontSize: '2em',
      fontWeight: 800,
    },
    h4: {
      fontSize: '1.5em',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25em',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1em',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.1em',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1em',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9em',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
    caption: {
      fontSize: '0.75em',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: '0 4px 15px rgba(229, 9, 20, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(229, 9, 20, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(229, 9, 20, 0.08)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
      defaultProps: {
        disableElevation: false,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        filled: {
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
            '&:hover fieldset': {
              borderColor: '#e50914',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e50914',
              boxShadow: '0 0 0 3px rgba(229, 9, 20, 0.1)',
            },
          },
          '& .MuiOutlinedInput-input': {
            fontSize: '1rem',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f5f5f5',
        },
        standardInfo: {
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
        },
        standardWarning: {
          backgroundColor: '#fff3e0',
          color: '#e65100',
        },
        standardError: {
          backgroundColor: '#ffebee',
          color: '#c62828',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#ffc107',
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
  },
})

export default muiTheme
