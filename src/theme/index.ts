import { createTheme, responsiveFontSizes, alpha, type Theme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f9a825',
      light: '#ffd54f',
      dark: '#c67100',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2332',
      secondary: '#546e7a',
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, fontSize: '3.5rem', lineHeight: 1.15 },
    h2: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h3: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3 },
    h4: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.35 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.75 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    subtitle1: { fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontWeight: 600, fontSize: '0.875rem' },
    caption: { fontSize: '0.8125rem' },
    overline: { fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.75rem' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme: t }: { theme: Theme }) => ({
          borderRadius: 8,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 4px 16px ${alpha(t.palette.primary.main, 0.22)}`,
          },
        }),
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: 'rgba(33, 150, 243, 0.5)',
            '&:hover': {
              borderColor: '#2196f3',
              backgroundColor: 'rgba(33, 150, 243, 0.04)',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          color: '#1a2332',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.8125rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#546e7a',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
