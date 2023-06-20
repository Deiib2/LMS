import { Alert, Box, CircularProgress } from "@mui/material"
import ExtCard from "../../components/ExtCard"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"
const ExtensionRequests = () => {
    const { user } = useAuthContext()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const getItems = async () => {
            const response = await fetch('/api/librarian/getAllExtensionRequests', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                setItems(json)
                setLoading(false)
            }
            if(!response.ok){
                setError(json)
                setLoading(false)
            }
        }
        getItems()
    }, [user])
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingY: '10px',
        }}>
            <h1>Extension Requests</h1>
            {loading && <CircularProgress size='5rem' />}
            {error && <Alert severity='error'>{error}</Alert>}
            {items && items.map(item => (
                <ExtCard borrowedItem={item} />
            ))}
        </Box>
    )
}
export default ExtensionRequests