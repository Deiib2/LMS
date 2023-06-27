import {Box, Card, CardActions, CardContent, CardMedia, IconButton, Button, Typography, Menu, MenuItem, Alert, Backdrop, CircularProgress} from '@mui/material'
import bookCover from '../images/bookcover.jpg'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from '@mui/material'
import bookco from '../images/BookCoverNotFound.jpg'

const BorrowedItemCard = ({item}) => {
    const [dueDate, setDueDate] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newDate, setNewDate] = useState(Date.now())
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const open = Boolean(anchorEl)
    const { user } = useAuthContext()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleExtension = () => {
        setAnchorEl(null);
        setDialogOpen(true)
        }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    const handleDateChange = async () => {
        setLoading(true)
        setDialogOpen(false)
        const response = await fetch(`/api/reader/requestExtension`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                itemId: item._id,
                newDate: newDate
            })
        })
        const json = await response.json()
        if(response.ok){
            setSuccess(true)
            setLoading(false)
        }
        if(!response.ok){
            setError(json)
            setLoading(false)
        }
    }

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
            <CardMedia component="img" height="260" image= {!item.imageUrl ? bookco : item.imageUrl} alt="book cover"
                sx={{ objectFit: "contain", margin: "5px" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                // overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
              }}>
                    {/* {isExpanded ? item.description : `${item.description.slice(0, 170)}...`} */}
                    {item.description}
                </Typography>
                {/* {isOverflown && (
                <Button onClick={toggleExpanded} size="small" color="primary">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Button>)} */}
                <Typography variant="body2" color="text.secondary">
                    Author: {item.author}
                </Typography>
                
                <Typography variant="body2" color="#ffaaaa">
                    Due date: {dueDate.substring(0,10)}
                </Typography>
                {success && <Alert severity="success">Extension request sent!</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </CardContent>
            <CardActions>
                <Box sx={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                   
                    <Button size="small"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color: 'grey'}}
                    >
                        <MoreHorizIcon />
                    </Button>
                    <Menu id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleExtension}>Request due date extension</MenuItem>
                        
                      </Menu>
                      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Due date extension request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the date you wish to extend the due date to.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New due date"
            type="date"
            fullWidth
            variant="standard"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDateChange}>Submit</Button>
        </DialogActions>
      </Dialog>
      {loading && <Backdrop open={loading} >
        <CircularProgress size='4rem' sx={{color: '#ffffff'}}/>
        </Backdrop>}
                </Box>
            </CardActions>
        </Card>
    )
}

export default BorrowedItemCard