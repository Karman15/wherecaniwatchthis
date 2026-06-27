import { createTheme } from '@mui/material/styles'

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
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
      paper: '#1a1a1a',
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
            backgroundColor: 'rgba(229, 9, 20, 0.12)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
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
            '&:hover fieldset': {
              borderColor: '#e50914',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e50914',
              boxShadow: '0 0 0 3px rgba(229, 9, 20, 0.15)',
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
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
