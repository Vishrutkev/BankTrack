import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Grid } from '@mui/material';
import BankTrackLogo from '../assets/banktrack_logo.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface NavbarProps {
    handleDrawerToggle: () => void;
    isSmallScreen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle, isSmallScreen }) => {
    const navigate = useNavigate();
    const { dispatch } = useAuth(); // Use useAuth hook to access dispatch

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/signIn');
    };

    return (
        <AppBar position="fixed" sx={{ width: '100%' }}>
            <Toolbar>
                {isSmallScreen && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Grid container sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: '13px' }}>
                    <Box
                        component="img"
                        src={BankTrackLogo}
                        alt="BankTrack Logo"
                        sx={{ width: 30, height: 30, cursor: 'pointer' }}
                    />
                    <Typography component="h2" variant="h6" sx={{ alignContent: 'center', fontWeight: 'bold' }}>BankTrack</Typography>
                </Grid>
                <IconButton
                    color="inherit"
                    aria-label="logout"
                    edge="end"
                    onClick={handleLogout}
                    sx={{ ml: 'auto' }}
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
