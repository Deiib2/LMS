import { Alert, Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'

const CreateItem = () => {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [imageUrl, setImageUrl] = useState('')
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
                imageUrl,
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
            setImageUrl('')
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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '90vh', pb:'2rem', mb:'2rem'}}>
                <Typography variant='h3' sx={{marginBottom: '1rem', fontFamily: "Poppins", py: '20px'}}>Create a new Item</Typography>
                <Stack spacing={2} sx={{width: '50%', mb:'20px'}}>
                    <TextField 
                        required
                        label='Title'
                        variant='outlined'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <TextField
                        required
                        label='Type'
                        variant='outlined'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <TextField 
                        required
                        label='Image URL'
                        variant='outlined'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <TextField
                        required
                        label='Description'
                        variant='outlined'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <TextField
                        required
                        label='Author'
                        variant='outlined'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <TextField
                        required
                        label='Total Copies'
                        type='number'
                        variant='outlined'
                        value={totalCopies}
                        onChange={(e) => setTotalCopies(e.target.value)}
                        sx={{backgroundColor: '#fff'}}
                    />
                    <Button variant='contained' sx={{background:'black', '&:hover': {
                    background: 'black',
                    },}} 
                    onClick={handleSubmit}>Create</Button>
                </Stack>
                {error && <Alert severity='error' sx={{mb:'2rem'}}>{error}</Alert>}
                {success && <Alert severity='success' sx={{mb:'2rem'}}>{success}</Alert>}
        </Box>
    )
}

export default CreateItem