import React, { ReactNode, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Theme } from '@emotion/react';

interface ToggleThemeProviderProps {
    children: ReactNode;
}

const ToggleThemeProvider = ({ children }: ToggleThemeProviderProps) => {
    const [themeMode, setThemeMode] = useState(() => {
        return sessionStorage.getItem('themeMode') || 'light';
    });

    const toggleTheme = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newThemeMode);
        sessionStorage.setItem('themeMode', newThemeMode);
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#f50057',
            },
            text: {
                primary: '#000',
                secondary: '#666',
            },
            background: {
                default: '#ffffff',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#90caf9',
            },
            secondary: {
                main: '#f48fb1',
            },
            text: {
                primary: '#ffffff',
                secondary: '#cccccc',
            },
            background: {
                default: '#121212',
            },
        },
    });

    const theme: Theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IconButton
                onClick={toggleTheme}
                sx={{ position: 'fixed', top: 13, right: 52, zIndex: 1000000 }}
            >
                {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Container maxWidth="xl" disableGutters>
                {children}
            </Container>
        </ThemeProvider>
    );
};

export default ToggleThemeProvider;
