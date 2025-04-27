import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/userSlice';
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });

            localStorage.setItem('token', data.token);
            console.log(data);

            dispatch(loginSuccess({
                token: data.token,
                user: data.user
            }));

            navigate('/dashboard');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || 'Login failed');
            setSnackbarVisible(true);
        }
    };


    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    const handleSnackbarClose = () => {
        setSnackbarVisible(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                    <Button onClick={handleRegisterRedirect} variant="outlined" size="large" sx={{ marginTop: 2 }}>
                        New User? Register
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={snackbarVisible}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default LoginPage;
