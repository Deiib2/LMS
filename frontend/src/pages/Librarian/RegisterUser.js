import {Box, Button, Card, MenuItem, Select, Stack, TextField, Typography, Alert, FormControl, InputLabel} from '@mui/material'
import {useState} from 'react'

const RegisterUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(type==="librarian"){
            setLoading(true)
            const response = await fetch('/api/librarian/registerLibrarian', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({name,email,password})
            })
            const json = await response.json()
            if(response.ok){
                setSuccess("Librarian registered successfully")
                setEmail('')
                setPassword('')
                setName('')
                setType('')
                setError(null)
            }
            if(!response.ok){
                setError(json.error)
                setSuccess(null)
            }
            setLoading(false)
        }
        else if(type==="reader"){
            setLoading(true)
            const response = await fetch('/api/librarian/registerReader', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({name,email,password})
            })
            const json = await response.json()
            if(response.ok){
                setSuccess("Reader registered successfully")
                setEmail('')
                setPassword('')
                setName('')
                setType('')
                setError(null)
            }
            if(!response.ok){
                setError(json.error)
                setSuccess(null)
            }
            setLoading(false)
        } else {
            setError("Please select a user type")
            setSuccess(null)
        }
    }

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h3" sx={{marginBottom: '1rem', fontFamily: "Poppins", py: '20px'}}>Register User</Typography>
                <Stack direction="column" spacing={2} sx={{width: '50%', mb:'20px'}}>
                    
                    <TextField value={name} label="Name" variant="outlined" sx={{backgroundColor: '#fff'}} required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField value={email} label="Email" variant="outlined" sx={{backgroundColor: '#fff'}} required
                        onChange={(e) => setEmail(e.target.value)}   
                        />
                    <TextField value={password} type="password" label="Password" variant="outlined" sx={{backgroundColor: '#fff'}} required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                    <Select 
                        required
                        label="User Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    >
                        <MenuItem value="librarian">Librarian</MenuItem>
                        <MenuItem value="reader">Reader</MenuItem>
                    </Select>
                    </FormControl>
                    <Button variant='contained' disabled={loading} sx={{background:'black', '&:hover': {
                    background: 'black',},}} onClick={handleSubmit}>
                        Register
                        </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                </Stack>
        </Box>
    )
}

export default RegisterUser