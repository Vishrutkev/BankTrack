import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BankTrackLogo from '../assets/banktrack_logo.png';
import signInCover from '../assets/signInCover.jpg';
import { useState } from 'react';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                BankTrack
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignIn = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
        email: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            formData
        });
        setFormData({ email: '', password: '' });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const defaultTheme = createTheme();


    //const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        // <ThemeProvider theme={defaultTheme}>
        <>
            <CssBaseline />
            <Container component="main" maxWidth="xl" disableGutters sx={{ height: '100vh' }}>
                <Grid container sx={{ height: '100%' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        component={Box}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        padding={4}
                    >
                        <Grid container sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: '10px' }}>
                            <Box
                                component="img"
                                src={BankTrackLogo}
                                alt="BankTrack Logo"
                                sx={{ width: 30, height: 30 }}
                            />
                            <Typography component="h2" variant="h6" sx={{ alignContent: 'center', fontWeight: 'bold' }}>BankTrack</Typography>
                        </Grid>
                        {/* <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: 16, right: 16 }}>
                            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton> */}
                        <Typography variant="body2" align="center" sx={{ maxWidth: 350, color: 'text.secondary', textAlign: 'left' }}>
                            Welcome back! Manage your finances effortlessly and securely.
                        </Typography>
                        <Grid container sx={{ maxWidth: 350, gap: '5px', display: 'flex' }}>
                            <Grid item>
                                <Typography component="h1" variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary' }}>
                                    Sign in to BankTrack
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 10, maxWidth: 350 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <EmailIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/SignUp" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Copyright sx={{ position: 'absolute', bottom: 20 }} />
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={0}
                        md={6}
                        padding={0}
                        margin={0}
                        sx={{
                            backgroundImage: `url(${signInCover})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundPosition: 'center top',
                            '@media (min-aspect-ratio: 1/1)': {
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            },

                        }}
                    />
                </Grid>
            </Container>
        </>
    );
}

export default SignIn;
