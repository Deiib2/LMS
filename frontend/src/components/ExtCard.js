import { Alert, Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const ExtCard = ({ borrowedItem }) => {
    const [dueDate, setDueDate] = useState(borrowedItem.returnDate)
    const [newDueDate, setNewDueDate] = useState(borrowedItem.extensionDate)
    const [itemName, setItemName] = useState('')
    const [readerName, setReaderName] = useState('')
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
                padding: '10px',
                margin: '10px',
                width: '400px',
                height: '300px',
                borderRadius: '10px',
            }}
        >
            <Stack direction='column' spacing={1} alignItems='center'>
            {readerName && <Typography variant='h4'>Reader: {readerName}</Typography>}
            {itemName && <Typography variant='h4'>Item: {itemName}</Typography>}
            <Typography variant='h6'>Current Due Date: {dueDate.substring(0,10)}</Typography>
            <Typography variant='h6'>Requested Due Date: {newDueDate.substring(0,10)}</Typography>
            <Stack direction='row' spacing={2}>
                <Button variant='contained' color='success' disabled={disabled} onClick={handleApprove}>Approve</Button>
                <Button variant='contained' color='warning' disabled={disabled} onClick={handleDeny}>Deny</Button>
            </Stack>
            {error && <Alert severity='error'>{error}</Alert>}
            {success && <Alert severity='success'>{success}</Alert>}
            </Stack>
        </Paper>
    )
}
export default ExtCard