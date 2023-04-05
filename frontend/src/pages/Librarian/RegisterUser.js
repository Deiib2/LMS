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
        if(type==="reader"){
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
        }
    }

    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: '30px'

        }}>
            <Card sx={{padding: '20px', width:'400px', height:'500px', borderRadius:'20px'}}>
                <Stack direction="column" spacing={2} >
                    <Typography variant="h3" alignSelf="center">Register User</Typography>
                    <TextField value={name} label="Name" variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField value={email} label="Email" variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}   
                        />
                    <TextField value={password} type="password" label="Password" variant="outlined" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                    <Select 
                        label="User Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="librarian">Librarian</MenuItem>
                        <MenuItem value="reader">Reader</MenuItem>
                    </Select>
                    </FormControl>
                    <Button disabled={loading} onClick={handleSubmit}>Register User</Button>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                </Stack>
            </Card>
        </Box>
    )
}

export default RegisterUser