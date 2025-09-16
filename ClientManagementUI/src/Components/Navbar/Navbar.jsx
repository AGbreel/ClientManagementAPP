import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Badge, Box, Button, Divider, IconButton, Menu, Stack, Typography } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GroupOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            // @ts-ignore
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

export default function Navbar({ open, handleDrawerOpen }) {
    const theme = useTheme();
    const location = useLocation();
    const navigete = useNavigate()

    // Filter path segments to remove IDs
    // const relatedPath = location.pathname
    //     .split("/")
    //     .filter(seg => seg && !isId(seg))
    //     .join(" › ");
    // const relatedPath = location.pathname.split("/").join(" › ");
    const currentPage = location.pathname.split("/").pop() || "Home";

    const [anchorEl, setAnchorEl] = useState(null);
    const oopen = Boolean(anchorEl);
    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const pushToProfile = () => {
        setAnchorEl(null);
        navigete('/profile');
    };

    const { logout } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout successfully");
            navigete('/login')
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        {!open && <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                { marginRight: 5 },
                                open && { display: 'none' },
                                { display: { xs: 'none', md: 'block' } }
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>}

                        <Typography sx={{ fontWeight: 'bold' }} variant="h6" gutterBottom >
                            PayTrack › {currentPage}
                        </Typography>

                        <Box flexGrow={1} />

                        <Stack direction="row" spacing={1}>
                            {/* <IconButton color="inherit" >
                                <GroupOutlined />
                            </IconButton>

                            <IconButton color="inherit" >
                                <Badge badgeContent={3} color="error">
                                    <NotificationsOutlinedIcon />
                                </Badge>
                            </IconButton> */}

                            <IconButton onClick={(e) => { handleOpen(e) }} size="small">
                                <Avatar
                                    alt="Ahmed Gbreel"
                                    src={"../../../public/defult-profile-image.png"}
                                    sx={{ width: 32, height: 32, border: "2px solid gray" }}
                                />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={oopen}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 5,
                                    sx: {
                                        width: 320,
                                        mt: 1.5,
                                        overflow: "visible",
                                        borderRadius: 3,
                                        p: 2,
                                        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.paper,
                                        color: theme.palette.mode === "dark" ? theme.palette.text.main : theme.palette.text.primary,
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >

                                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                    <Avatar alt="Ahmed Gbreel" src={"../../../public/defult-profile-image.png"} sx={{ width: 56, height: 56, mb: 1 }} />
                                    <Typography variant="h6" fontWeight="bold"> Hi, Ahmed Gbreel! </Typography>
                                    <Typography variant="body2" color="text.secondary"> Admin </Typography>
                                </Box>

                                <Stack sx={{ width: "100%", alignItems: "center", justifyContent: "between" }} direction="row" spacing={1} my={3}>
                                    <Button onClick={() => pushToProfile()} sx={{
                                        py: 0.5,
                                        color: theme.palette.mode === "dark" ? theme.palette.text.main : theme.palette.text.primary,
                                        textTransform: "capitalize", width: "100%", borderColor: "gray", whiteSpace: 'nowrap',
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.paper,
                                            color: theme.palette.mode === "dark" ? theme.palette.text.main : theme.palette.text.primary
                                        }
                                    }} variant="outlined" size="small" startIcon={<SettingsIcon sx={{ fontSize: 16 }} />}>
                                        Manage account
                                    </Button>
                                    <Button
                                        onClick={() => handleLogout()}
                                        sx={{
                                            py: 0.5,
                                            color: theme.palette.mode === "dark" ? theme.palette.text.main : theme.palette.text.primary,
                                            textTransform: "capitalize", width: "100%", borderColor: "gray", whiteSpace: 'nowrap',
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.paper,
                                                color: theme.palette.mode === "dark" ? theme.palette.text.main : theme.palette.text.primary
                                            }
                                        }} variant="outlined" size="small" startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}>
                                        Sign out
                                    </Button>
                                </Stack>
                                <Divider />
                            </Menu>
                        </Stack>
                    </Toolbar>
                </AppBar>
                {/* <ToastContainer /> */}
            </Box>
        </>
    );
}
