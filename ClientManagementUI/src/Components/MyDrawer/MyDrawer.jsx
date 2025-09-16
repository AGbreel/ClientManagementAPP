import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { HistoryOutlined, HomeOutlined, ListAltOutlined, PeopleAltOutlined, ReceiptLongOutlined, SchoolOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);


export default function MyDrawer({ open, handleDrawerClose }) {

  const theme = useTheme();
  const location = useLocation();
  const navigete = useNavigate();

  const userArr1 = [
    { 'text': 'Home', 'icon': <HomeOutlined />, 'path': '/', },
    { 'text': 'Client Management', 'icon': <PeopleAltOutlined />, 'path': '/client-management', },
    { 'text': 'Transaction Recording', 'icon': <ReceiptLongOutlined />, 'path': '/transaction-recording', },
  ];

  const userArr2 = [
    { 'text': 'Client List', 'icon': <ListAltOutlined />, 'path': '/client-list', },
    { 'text': 'Transaction Log', 'icon': <HistoryOutlined />, 'path': '/transaction-log', },
  ]

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSpacesButtonIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Drawer variant="permanent" open={open}
      sx={{
        "& .MuiListItemText-primary": { color: "white" },
        "& .MuiListItemText-secondary": { color: "white" },
        "& .MuiListItemIcon-root": { color: "white" },
      }}>
      <DrawerHeader className="flex justify-center items-center">
        <div 
        className={`p-2 border-5 border-x-cyan-600 rounded-full ${open ? "my-5" : "my-0"} transition-all `}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: open ? 16 : 0,
              display: "flex",
              alignItems: "center",
            }}
            variant="h6"
            gutterBottom
          >
            <PeopleAltOutlined fontSize="medium" sx={{ mr: 1 }} />
            Client Management
          </Typography>
        </div>

        <IconButton
          onClick={handleDrawerClose}
          sx={{ color: theme.palette.primary.main }}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <Divider />

      <List sx={{ mt: 1 }}>
        {userArr1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block', mb: 2 }}>
            <ListItemButton
              onClick={() => { navigete(item.path) }}

              sx={[
                {
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname == item.path ? theme.palette.primary.dark : 'transparent',
                  transition: "1s",
                  '& .MuiListItemIcon-root': {
                    color: location.pathname == item.path ? '#fff' : theme.palette.text.primary,
                    fontWeight: 'bold'
                  },
                  '& .MuiListItemText-primary': {
                    color: location.pathname == item.path ? '#fff' : theme.palette.text.primary,
                    fontWeight: 'bold'
                  },
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    '& .MuiListItemIcon-root': {
                      color: '#fff',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#fff',
                    },
                  }
                },
              ]}>

              <ListItemIcon primary={item.text}
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 1.5,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}>

                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text}
                sx={[
                  open
                    ? {
                      opacity: 1,
                      color: "#000"
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />

            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List sx={{ mt: 1 }}>
        {userArr2.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block', mb: 2 }}>
            <ListItemButton
              onClick={() => { navigete(item.path) }}

              sx={[
                {
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname == item.path ? theme.palette.primary.dark : 'transparent',
                  transition: "1s",
                  '& .MuiListItemIcon-root': {
                    color: location.pathname == item.path ? '#fff' : theme.palette.text.primary,
                    fontWeight: 'bold'
                  },
                  '& .MuiListItemText-primary': {
                    color: location.pathname == item.path ? '#fff' : theme.palette.text.primary,
                    fontWeight: 'bold'
                  },
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    '& .MuiListItemIcon-root': {
                      color: '#fff',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#fff',
                    },
                  }
                },
              ]}>

              <ListItemIcon primary={item.text}
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 1.5,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}>

                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text}
                sx={[
                  open
                    ? {
                      opacity: 1,
                      color: "#000"
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>

            {/* <Chat /> */}
          </ListItem>
        ))}
      </List>
    </Drawer >
  );
}
