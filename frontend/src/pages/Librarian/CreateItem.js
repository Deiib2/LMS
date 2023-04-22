import { Alert, Box, Paper, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'

const CreateItem = () => {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [totalCopies, setTotalCopies] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setTotalCopies(parseInt(totalCopies))
        const response = await fetch('/api/librarian/newItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                type,
                description,
                author,
                totalCopies
            })
        })
        const json = await response.json()
        if(response.ok){
            setSuccess(`"${title}" ${type} created successfully`)
            setTitle('')
            setType('')
            setDescription('')
            setAuthor('')
            setTotalCopies('')
            setError(null)
        }
        if(!response.ok){
            setError(json.error)
            setSuccess(null)
        }
    }
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <Paper elevation={3} sx={{padding: '2rem', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px'}}>
                <Typography variant='h3' sx={{marginBottom: '1rem'}}>Create a new Item</Typography>
                <Stack spacing={2} sx={{width: '100%'}}>
                    <TextField 
                        required
                        label='Title'
                        variant='outlined'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        label='Type'
                        variant='outlined'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <TextField
                        required
                        label='Description'
                        variant='outlined'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        required
                        label='Author'
                        variant='outlined'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <TextField
                        required
                        label='Total Copies'
                        type='number'
                        variant='outlined'
                        value={totalCopies}
                        onChange={(e) => setTotalCopies(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleSubmit}>Create</Button>
                </Stack>
                {error && <Alert severity='error'>{error}</Alert>}
                {success && <Alert severity='success'>{success}</Alert>}
            </Paper>
        </Box>
    )
}

export default CreateItem