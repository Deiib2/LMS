import { Box, Grid, CircularProgress, Alert } from "@mui/material"
import { useState, useEffect } from "react"
import ItemCard from "../components/ItemCard"

const Explore = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch('/api/guest/allItems')
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
    }, [])

    return(
        <Box sx={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            {loading && <CircularProgress size='5rem'/>}
            {error && <Alert severity='error'>{error}</Alert>}
        <Grid container spacing={2} padding={2}>
            {items && items.map(item => (
                <Grid item xs={3}>
                    <ItemCard item={item}/>
                </Grid>
            ))}
        </Grid>
        
            
        </Box>
    )
}

export default Explore