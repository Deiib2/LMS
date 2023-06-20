import { Alert, Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const ExtCard = ({ borrowedItem }) => {
    const [dueDate, setDueDate] = useState(borrowedItem.returnDate)
    const [newDueDate, setNewDueDate] = useState(borrowedItem.extensionDate)
    const [itemName, setItemName] = useState('')
    const [readerName, setReaderName] = useState('')
    const [readerEmail, setReaderEmail] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const { user } = useAuthContext()

    useEffect(() => {
        const getReader = async () => {
            const response = await fetch(`/api/librarian/getReader/${borrowedItem.readerId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setReaderName(json.name)
            }
            if (!response.ok) {
                setError(json)
            }
        }
        const getEmail = async () => {
            const response = await fetch(`/api/librarian/getUserEmail/${borrowedItem.readerId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setReaderEmail(json)
            }
            if (!response.ok) {
                setError(json)
            }
        }
        const getItem = async () => {
            const response = await fetch(`/api/librarian/getItem/${borrowedItem.itemId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setItemName(json.title)
            }
            if (!response.ok) {
                setError(json)
            }
        }
        getItem()
        getReader()
        getEmail()
    }, [])

    const handleApprove = async () => {
        setLoading(true)
        setDisabled(true)
        const response = await fetch(`/api/librarian/grantExtension`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                borrowedId: borrowedItem._id,
                newDate: newDueDate
            })
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess('Request Approved')
            setLoading(false)
        }
        if (!response.ok) {
            setError(json)
            setLoading(false)
        }
    }

    const handleDeny = async () => {
        setLoading(true)
        setDisabled(true)
        const response = await fetch(`/api/librarian/denyExtension`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                borrowedId: borrowedItem._id
            })
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess('Request Denied')
            setLoading(false)
        }
        if (!response.ok) {
            setError(json)
            setLoading(false)
        }
    }

    return(
        <Paper 
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                margin: '10px',
                width: '400px',
                borderRadius: '10px',
            }}
        >
            <Stack direction='column' spacing={1} alignItems='center'>
            <Typography sx={{fontFamily: 'Poppins', fontSize: '16px'}}>Item: </Typography>
            {itemName && <Typography variant='h4' sx={{fontFamily: 'Poppins', color:'black', fontWeight: '600'}}>{itemName}</Typography>}
            <Stack direction='row' spacing={5} alignItems='center'>
            <Stack direction='column' spacing={0.5} alignItems='center'>
            <Typography sx={{fontFamily: 'Poppins', fontSize: '16px'}}>Reader name: </Typography>
            {readerName && <Typography variant='h4' sx={{fontFamily: 'Poppins', color:'black', fontWeight: '600'}}>{readerName}</Typography>}
            </Stack>
            <Stack direction='column' spacing={0.5} alignItems='center'>
            <Typography sx={{fontFamily: 'Poppins', fontSize: '16px'}}>Reader Email: </Typography>
            {readerEmail && <Typography variant='h4' sx={{fontFamily: 'Poppins', color:'black', fontWeight: '600', fontSize: '24px'}}>{readerEmail}</Typography>}
            </Stack>
            </Stack>
            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontSize: '16px'}}>Current Due Date: </Typography>
            <Typography variant='h6' sx={{fontFamily: 'Poppins', color:'black', fontWeight: '600'}}>{dueDate.substring(0,10)}</Typography>
            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontSize: '16px'}}>Requested Due Date: </Typography>
            <Typography variant='h6' sx={{fontFamily: 'Poppins', color:'black', fontWeight: '600'}}>{newDueDate.substring(0,10)}</Typography>
            <Stack direction='row' spacing={2}>
                <Button variant='outlined' sx={{background:'black', color: 'white', borderColor:'black', '&:hover':{background:'black', color: 'white', borderColor:'black'}}} disabled={disabled} onClick={handleApprove}>GRANT</Button>
                <Button variant='outlined' sx={{background:'white', color:'black', borderWidth: '1px', borderColor:'black', '&:hover':{background:'white', color: 'black',borderWidth: '1px', borderColor:'black',}}} disabled={disabled} onClick={handleDeny}>Deny</Button>
            </Stack>
            {error && <Alert severity='error'>{error}</Alert>}
            {success && <Alert severity='success'>{success}</Alert>}
            </Stack>
        </Paper>
    )
}
export default ExtCard