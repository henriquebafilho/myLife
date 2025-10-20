import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import StadiumIcon from '@mui/icons-material/Stadium';
import MusicNote from '@mui/icons-material/MusicNote';
import Album from '@mui/icons-material/Album';
import CDs from '../pages/CDs/index';
//import Jogos from '../pages/Jogos/index';
import Shows from '../pages/Shows/index';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const screenMap = {
    cds: CDs,
    //jogos: Jogos,
    shows: Shows
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('cds');
    const profileOptions = [/* { title: 'Perfil', key: 'perfil', icon: <PersonIcon /> } */];
    const aboutMe = [
        //{ title: 'Jogos do Botafogo', key: 'jogos', icon: <StadiumIcon /> },
        { title: 'Shows', key: 'shows', icon: <MusicNote /> },
        { title: 'CDs', key: 'cds', icon: <Album /> }
    ];

    const handleItemClick = (screenKey) => {
        setCurrentScreen(screenKey);
    };

    const CurrentContent = screenMap[currentScreen];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Henrique Filho
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {profileOptions.map((option) => (
                        <ListItem key={option.key} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {option.icon}
                                </ListItemIcon>
                                <ListItemText primary={option.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {aboutMe.map((option) => (
                        <ListItem key={option.key} disablePadding>
                            <ListItemButton
                                onClick={() => handleItemClick(option.key)}
                                selected={currentScreen === option.key}
                            >
                                <ListItemIcon>
                                    {option.icon}
                                </ListItemIcon>
                                <ListItemText primary={option.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
        <CurrentContent />
    </>);
}
