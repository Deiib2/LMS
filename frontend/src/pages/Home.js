import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaPlus, FaSearch } from "react-icons/fa";
import HomeNavButton from "../components/HomeNavButton";
import {PersonAdd} from '@mui/icons-material';
import { Book } from "@mui/icons-material";
import { RequestPage } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";

const Home = () => {
    const {user} = useAuthContext();
    return(
        <div className="home">
            <h1>Library Management System</h1>
            <h2>Welcome to the LibraryMS</h2>
            <hr/>
            <Stack direction="row" spacing={5}>
                <HomeNavButton text="Explore" link='/explore' icon= {FaSearch} />
                { user && user.type==="librarian" && <HomeNavButton text="Create" link='/createitem' icon={FaPlus}/>}
                { user && user.type==="librarian" && <HomeNavButton text="Register User" link='/registeruser' icon={PersonAdd}/>}
                { user && user.type ==="librarian" && <HomeNavButton text="Lend" link='/lend' icon={Book}/>}
                { user && user.type ==="librarian" && <HomeNavButton text="Extension Requests" link='/extensionrequests' icon={RequestPage}/>}
                { user && user.type ==="reader" && <HomeNavButton text="My Items" link='/myitems' icon={Bookmark}/>}
            </Stack>
        </div>
    )
}
export default Home;