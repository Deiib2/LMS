import { Box, Button, Card, Stack, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Lock, LockOutlined } from "@mui/icons-material";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('email: ', email, 'password: ', password)
        await login(email, password);
    }
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: '30px'

        }}>
                <Stack direction="column" spacing={2} alignItems='center' width='300px'>
                    <Lock sx={{fontSize: '150px'}}/>
                    <TextField value={email} label="Email Address" fullWidth variant="outlined" sx={{background: 'white'}}
                        onChange={(e) => setEmail(e.target.value)}   
                        />
                    <TextField value={password} type="password" label="Password" fullWidth variant="outlined" sx={{background: 'white'}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button disabled={loading} fullWidth variant="contained" onClick={handleSubmit} 
                    sx={{background:'black', height:'50px', '&:hover':{background:'black'}}}>
                        Login</Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
        </Box>
    );
}

export default Login;