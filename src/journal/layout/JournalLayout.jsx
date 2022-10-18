import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

const DRAWER_WIDTH = 240;

export const JournalLayout = ({ children }) => {

    return(
        <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
            <NavBar drawerWidth={ DRAWER_WIDTH } />

            <SideBar drawerWidth={ DRAWER_WIDTH } />

            <Box 
                component='main'
                sx={{ flexGrow: 1, p:3 }}>

               <Toolbar />

                {/* Esto es como usar slots en vuejs */}
                { children }
            </Box>
        </Box>
    )

};