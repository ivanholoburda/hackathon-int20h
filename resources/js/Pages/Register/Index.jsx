import React from 'react';
import { useForm } from '@inertiajs/react';
import { Box, Button, TextField, Typography, Container, CssBaseline, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RegisterForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Box sx={{backgroundColor: '#e8f5e9' }}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        padding: '50px',
                        borderRadius: '10px',
                        boxShadow: 5,
                        maxWidth: '500px',
                        margin: 'auto',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '70px',
                            height: '70px',
                            backgroundColor: '#a5d6a7',
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                            zIndex: -1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '70px',
                            height: '70px',
                            backgroundColor: '#a5d6a7',
                            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
                            zIndex: -1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#b2fab4',
                            borderRadius: '0 0 100px 0',
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#b2fab4',
                            borderRadius: '100px 0 0 0',
                            zIndex: 0,
                        }}
                    />

                    <Avatar sx={{ m: 1, bgcolor: '#81c784', width: 60, height: 60 }}>
                        <LockOutlinedIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography component="h1" variant="h4" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                        Реєстрація
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Ім'я"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={data.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#66bb6a' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#388e3c' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#81c784' },
                                    '&:hover fieldset': { borderColor: '#66bb6a' },
                                    '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
                                },
                                mb: 1,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Електронна пошта"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#66bb6a' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#388e3c' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#81c784' },
                                    '&:hover fieldset': { borderColor: '#66bb6a' },
                                    '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
                                },
                                mb: 1,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#66bb6a' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#388e3c' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#81c784' },
                                    '&:hover fieldset': { borderColor: '#66bb6a' },
                                    '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
                                },
                                mb: 1,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Підтвердіть пароль"
                            type="password"
                            id="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#66bb6a' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#388e3c' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#81c784' },
                                    '&:hover fieldset': { borderColor: '#66bb6a' },
                                    '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
                                },
                                mb: 1,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#81c784',
                                '&:hover': {
                                    backgroundColor: '#66bb6a',
                                    transform: 'scale(1.05)',
                                },
                                borderRadius: '30px',
                                padding: '12px',
                                fontSize: '16px',
                            }}
                            disabled={processing}
                        >
                            Зареєструватися
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link
                                    href="/login"
                                    variant="body2"
                                    sx={{
                                        color: '#388e3c',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                        fontSize: '14px',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Вже маєте акаунт? Увійти
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default RegisterForm;
