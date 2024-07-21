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
import { createTheme } from '@mui/material/styles';
import BankTrackLogo from '../assets/banktrack_logo.png';
import signInCover from '../assets/signInCover.jpg';
import { useState } from 'react';
import { signIn } from '../fetch/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../component/Loading';
import Notification from '../component/Notification';

interface SignInData {
    email: string;
    password: string;
}

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
    const [formData, setFormData] = useState<SignInData>({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signIn(formData.email, formData.password)
            .then(async (res: any) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    setErrorMessage(errorData || 'Login failed');
                    throw new Error(errorData || 'Login failed');
                }
                setLoading(true);
                const responseData = await res.json();
                sessionStorage.setItem('token', responseData.token);
                sessionStorage.setItem('user_id', responseData.user_id);
                setErrorOpen(false);
                setSuccessOpen(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                }, 1000);
                setFormData({ email: '', password: '' });
            })
            .catch((error) => {
                setErrorOpen(true);
                console.error('Error:', error);
            });
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
            {loading && <Loading />}
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
                        <Notification
                            open={successOpen}
                            message="Login successful! Redirecting..."
                            severity="success"
                            onClose={() => setSuccessOpen(false)}
                        />
                        <Notification
                            open={errorOpen}
                            message={errorMessage}
                            severity="error"
                            onClose={() => setErrorOpen(false)}
                        />
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
