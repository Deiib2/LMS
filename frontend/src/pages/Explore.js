import { Box, Grid, CircularProgress, Alert, InputLabel, TextField, Pagination, Stack } from "@mui/material"
import { useState, useEffect } from "react"
import ItemCard from "../components/ItemCard"
import { FaSearch } from "react-icons/fa"
import { InputAdornment } from "@mui/material"
import { set } from "mongoose"

const Explore = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [first, setFirst] = useState(true);
    const handleChange = (event, value) => {
        if(page!==value){
            setPage(value);
            setLoading(true);
            setItems([]);
        }
    };

    useEffect(() => {
        const getItems = async () => {
            console.log('fetching')
            const response = await fetch(`/api/guest/allItems?limit=9&page=${page}`)
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setItems(json.items)
                setTotalPages(json.totalPages)
                setLoading(false)
            }
            if(!response.ok){
                setError(json)
                setLoading(false)
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        const searchItems = async () => {
            const response = await fetch(`/api/guest/search?limit=9&page=${page}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: search, author: search})
            })
            const json = await response.json()
            if(response.ok){
                setItems(json.items)
                setTotalPages(json.totalPages)
                setLoading(false)
            }
            if(!response.ok){
                setError(json)
                setLoading(false)
            }
        }
        searchItems()
    }, [search, page])


    return(
        <Box sx={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingTop:'15px'}}>
        <TextField 
            value={search} 
            label='Search'
            variant='outlined' 
            sx={{backgroundColor: 'white', width: '50%', mb: 3}}
            onChange={(e) => {setSearch(e.target.value); setPage(1); setItems([]); setLoading(true); }}
            
            />
            {loading && <CircularProgress size='5rem'/>}
            {error && <Alert severity='error'>{error}</Alert>}
            <Box sx={{width: '75%', minHeight: '370px'}}>
        <Grid container spacing={2} padding={2}>
            {items && items.map(item => (
                <Grid item xs={4}>
                    <ItemCard item={item}/>
                </Grid>
            ))}
        </Grid>
        </Box>
        <Stack spacing={2} padding={2}>
            <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
        
        </Box>
    )
}

export default Explore