import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { Box, Grid, Alert, CircularProgress, Typography } from "@mui/material";
import BorrowedItemCard from "../../components/BorrowedItemCard";
const MyItems = () => {
    const { user } = useAuthContext()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    console.log(user)
    useEffect(() => {
        const getItems = async () => {
            console.log('hiiiiiii')
            console.log('user in useeffect: ',user)
            const response = await fetch('/api/reader/currentBorrowedItems', {
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
        <Box sx={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingTop:'15px', paddingX:'10px'}}>
            {loading && <CircularProgress size='5rem' />}
            {error && <Alert severity='error'>{error}</Alert>}
            <Grid container spacing={2}>
                {items.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <BorrowedItemCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default MyItems