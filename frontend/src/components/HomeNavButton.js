import { Box, Button, Stack, Typography } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeNavButton = ({text, link, icon: Icon}) => {
    const navigate = useNavigate();

    return(
        <Box>
                <Button variant="outlined" onClick={() => navigate(link)}
                sx={{margin: '10px', width:'150px', height:'150px', 
                borderRadius:'20px', background:'linear-gradient(45deg, white, darkgrey)', borderColor:'black', borderWidth:'3px',
                '&:hover': {
                    background: 'linear-gradient(45deg, #444, #cc10dd)',
                    borderColor: '#000',
                    boxShadow: 'none',
                    borderWidth:'3px'
                },
                '&:active': {
                    boxShadow: 'none',
                    background: '#777',
                    borderColor: '#000',
                    borderWidth:'3px'
                },
                }}>
                    <Stack direction="column" spacing={1} alignItems="center">
                    <Typography variant="h3" sx={{fontFamily: "Poppins", color:'black', fontSize:'24px', fontWeight:'600'}}>
                        {text}
                    </Typography>
                    {/* <FaSearch color="black" size="30px"/> */}
                    {Icon && <Icon sx={{color: 'black', fontSize: '40px'}} color="black" size="30px"/>}
                    </Stack>
                    </Button>
            </Box>
    )
}
export default HomeNavButton;