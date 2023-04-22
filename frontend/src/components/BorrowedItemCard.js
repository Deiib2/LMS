import {Card, CardContent, CardMedia, Typography} from '@mui/material'
import bookCover from '../images/bookcover.jpg'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const BorrowedItemCard = ({item}) => {
    const [dueDate, setDueDate] = useState('')
    const { user } = useAuthContext()
    useEffect(() => {
        const getDueDate = async () => {
            const response = await fetch(`/api/reader/getDueDate/${item._id}`,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
            const json = await response.json()
            if(response.ok){
                setDueDate(json)
            }
        }
        getDueDate()
    }, [])
    return (
        <Card>
            <CardMedia component="img" height="260" image={bookCover} alt="book cover"
                sx={{ objectFit: "contain", margin: "5px" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {item.author}
                </Typography>
                <Typography variant="body2" color="#ffaaaa">
                    Due date: {dueDate.substring(0,10)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BorrowedItemCard