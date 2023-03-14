import {Card, CardContent, CardMedia, Typography} from '@mui/material'
import bookCover from '../images/bookcover.jpg'

const ItemCard = ({item}) => {
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
            </CardContent>
        </Card>
    )
}

export default ItemCard