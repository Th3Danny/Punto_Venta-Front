import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const LoginContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2)
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 450,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        padding: theme.spacing(3)
    }
}));
