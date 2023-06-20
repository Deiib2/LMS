import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material'
import bookCover from '../images/bookcover.jpg'
import richdad from '../images/Rich_dad_cover.jpg'
import lotr from '../images/lotr_cover.jpg'

const ItemCard = ({item}) => {
    const book = item.title === 'Rich Dad, Poor Dad' ? richdad : item.title === 'The Lord of the Rings' ? lotr : bookCover
    return (
        <Card elevation={4}>
            <CardMedia component="img" height="260" image= {!item.imageUrl ? lotr : item.imageUrl} alt="book cover"
                sx={{ objectFit: "contain", margin: "5px" }}
            />
            <CardContent >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'Poppins', fontWeight: '600'}}>
                    {item.title}
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{
                height: "40px",
                display: "-webkit-box",
                wordBreak: "break-word",
                overflow: "hidden",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}>
                    {item.description}
                </Typography>
                <Typography variant="body2" sx={{pt: '3px'}}>
                    Author: {item.author}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ItemCard