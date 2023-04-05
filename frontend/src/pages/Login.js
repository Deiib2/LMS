import { Box, Button, Card, Stack, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

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
            <Card sx={{padding: '20px', width:'300px', height:'400px', borderRadius:'20px'}}>
                <Stack direction="column" spacing={3} >
                    <Typography variant="h3" alignSelf="center">Login</Typography>
                    <TextField value={email} label="Email" variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}   
                        />
                    <TextField value={password} type="password" label="Password" variant="outlined" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button disabled={loading} variant="contained" onClick={handleSubmit}>Login</Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </Card>
        </Box>
    );
}

export default Login;