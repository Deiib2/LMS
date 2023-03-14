import { Link } from 'react-router-dom';
import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa';
import { Stack, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <header className='header'>
            <div className='container'>
            <Stack direction="row" spacing={10}>
                <Link to="/"><Typography variant="h4" sx={{color: 'white'}} >
                        LibraryMS
                    </Typography></Link>
                <Stack direction="row" spacing={2}>
                    <Link to="/explore">
                        Explore
                    </Link>
                    <Link to="/createitem">
                        <Typography variant="h6" sx={{color: 'white'}} >
                            Create an Item
                        </Typography>
                    </Link>
                    </Stack>
                    </Stack>
            {/* <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul> */}
            <Link to="/login">
                <FaSignInAlt/> Login
            </Link>
            </div>

        </header>
    );
}

export default Navbar;