import React, { useEffect, useState } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Portal from '../components/portal';
import ToggleThemeProvider from '../components/toggleThemeProvider';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200; // Set your custom width here

const Dashboard = () => {
    const [view, setView] = useState('Overview');
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const transactions: any = [];
    const navigate = useNavigate();
    const { user, dispatch } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <ToggleThemeProvider>
                    <Navbar handleDrawerToggle={handleDrawerToggle} isSmallScreen={isSmallScreen} />
                    <Sidebar
                        setView={setView}
                        drawerWidth={drawerWidth}
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        isSmallScreen={isSmallScreen}
                    />
                    <Portal view={view} transactions={transactions} drawerWidth={drawerWidth} isSmallScreen={isSmallScreen} />
                </ToggleThemeProvider>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
