import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MyDrawer from '../MyDrawer/MyDrawer';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../Context/AuthContext';
// import { ToastContainer } from 'react-toastify';


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { userToken } = useContext(AuthContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    {userToken && <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />}
                    {userToken && <MyDrawer open={open} handleDrawerClose={handleDrawerClose} />}

                    <Box component="main" sx={{ width: "100%", flexGrow: 1 }}>
                        {userToken && <DrawerHeader open={open} handleDrawerOpen={handleDrawerOpen} /> }

                        <Outlet />
                        {/* <ToastContainer /> */}
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}
