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
import BankTrackLogo from '../assets/banktrack_logo.png';
import PersonIcon from '@mui/icons-material/Person';
import signInCover from '../assets/signInCover.jpg';
import { useState } from 'react';
import { signUp } from '../fetch/auth';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../component/Loading';

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

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signUp(formData.name, formData.email, formData.password)
            .then(async (res: any) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(errorData || 'SignUp failed');
                    throw new Error(errorData || 'SignUp failed');
                }
                setLoading(true);
                const responseData = await res.json();
                setOpen(false);
                setSuccessOpen(true);
                setTimeout(() => {
                    navigate('/dashboard');
                    setLoading(false);
                }, 1000);
                setFormData({ name: '', email: '', password: '' });
            })
            .catch((error) => {
                setOpen(true);
                console.error('Error:', error);
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Container component="main" maxWidth="xl" disableGutters sx={{ height: '100vh' }}>
                <CssBaseline />
                {loading && <Loading />}
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

                        <Typography variant="body2" align="center" sx={{ maxWidth: 350, color: 'gray', textAlign: 'left' }}>
                            Join us today and take control of your financial future!
                        </Typography>
                        <Grid container sx={{ maxWidth: 350, gap: '5px', display: 'flex' }}>
                            <Grid item>
                                {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar> */}
                            </Grid>
                            <Grid item>
                                <Typography component="h1" variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                                    Sign up to BankTrack
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth: 350, mb: 6 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <PersonIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Copyright sx={{ position: 'absolute', bottom: 16 }} />
                        <Snackbar open={successOpen} autoHideDuration={2000} onClose={() => setSuccessOpen(false)}>
                            <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
                                Login successful! Redirecting...
                            </Alert>
                        </Snackbar>
                        <Snackbar open={open} autoHideDuration={10000} onClose={() => setOpen(false)}>
                            <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        </Snackbar>
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

export default SignUp;
