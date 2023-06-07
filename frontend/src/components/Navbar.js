import { Link, useNavigate } from 'react-router-dom';
import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa';
import { Button, Stack, Typography } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const {user} = useAuthContext();
    const {logout} = useLogout();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/')
    }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <header className='header'>
            <div className='container'>
            <Stack direction="row" spacing={10}>
                <Link to="/"><Typography variant="h4" sx={{color: 'black', fontFamily: 'Poppins', fontWeight: '500'}} >
                        LibraryMS
                    </Typography></Link>
                <Stack direction="row" spacing={4}>
                    <Link to="/explore">
                        <Typography variant="h6" sx={{color: 'black', fontFamily: 'Poppins'}}>
                            Explore
                        </Typography>
                    </Link>
                    { user && user.type==="librarian" && <Link to="/createitem">
                        <Typography variant="h6" sx={{color: 'black', fontFamily:'Poppins'}} >
                            Create an Item
                        </Typography>
                    </Link>}
                    { user && user.type==="librarian" && <Link to="/registeruser">
                        <Typography variant="h6" sx={{color: 'black', fontFamily:'Poppins'}} >
                            Register User
                        </Typography>
                    </Link>}
                    { user && user.type === "reader" && <Link to="/myitems">
                        <Typography variant="h6" sx={{color: 'black', fontFamily:'Poppins'}} >
                            My Items
                        </Typography>
                    </Link>
                    }
                    {
                        user && (user.type === "librarian" || user.type === "admin") && <Link to="/lend">
                            <Typography variant="h6" sx={{color: 'black', fontFamily:'Poppins'}} >
                                Lend
                            </Typography>
                        </Link>
                    }
                    {
                        user && (user.type === "librarian" || user.type === "admin") && <Link to="/extensionrequests">
                            <Typography variant="h6" sx={{color: 'black', fontFamily:'Poppins'}} >
                                Extension Requests
                            </Typography>
                        </Link>
                    }
                    </Stack>
                    </Stack>
            {/* <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul> */}
            {!user &&
            <Button onClick={handleLogin} sx={{ color: '#fff'}}>
                <FaSignInAlt color='black'/> <Typography variant='body' sx={{color:'black', fontFamily:'Poppins', pl:'5px'}}> Login</Typography>
            </Button>}
            {user &&
            <Button onClick={handleLogout} sx={{ color: '#fff'}}>
                <FaSignOutAlt color='black'/> <Typography variant='body' sx={{color:'black', fontFamily:'Poppins', pl:'5px'}}> Logout</Typography>
            </Button>}
            </div>

        </header>
    );
}

export default Navbar;