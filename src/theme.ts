import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6f4e37', 
            light: '#967259',
            dark: '#4e3629',
            contrastText: '#fff',
        },
        secondary: {
            main: '#c2a07e', 
            light: '#decbb7',
            dark: '#a68059',
            contrastText: '#fff',
        },
        background: {
            default: '#fcfaf8', 
            paper: '#ffffff',
        },
        text: {
            primary: '#3e2723',
            secondary: '#795548',
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: '#3e2723' },
        h2: { fontWeight: 700, color: '#3e2723' },
        h3: { fontWeight: 700, color: '#3e2723' },
        h4: { fontWeight: 700, color: '#3e2723' },
        h5: { fontWeight: 600, color: '#3e2723' },
        h6: { fontWeight: 600, color: '#3e2723' },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(111, 78, 55, 0.2)',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#5d4037',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(111, 78, 55, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
                elevation1: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: '#3e2723',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(111, 78, 55, 0.1)',
                },
            },
        },
    },
});

export default theme;