import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StadiumIcon from '@mui/icons-material/Stadium';
import MusicNote from '@mui/icons-material/MusicNote';
import Album from '@mui/icons-material/Album';
import CDs from '../pages/CDs/index';
import VoltarAoTopo from './VoltarAoTopo';
import Jogos from '../pages/Jogos/index';
import Shows from '../pages/Shows/index';
import Home from '../pages/Home/index';

const RAIL_WIDTH = 65;

const screenMap = {
    home: Home,
    jogos: Jogos,
    shows: Shows,
    cds: CDs,
};

const navItems = [
    { title: 'Início', key: 'home', icon: <HomeIcon /> },
    { title: 'Jogos', key: 'jogos', icon: <StadiumIcon /> },
    { title: 'Shows', key: 'shows', icon: <MusicNote /> },
    { title: 'CDs', key: 'cds', icon: <Album /> },
];

export default function Topbar() {
    const [currentScreen, setCurrentScreen] = useState('home');
    const CurrentContent = screenMap[currentScreen];

    const navigate = (key) => {
        setCurrentScreen(key);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    return (
        <>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar>
                    <Typography
                        variant="h6" noWrap component="div"
                        onClick={() => navigate('home')}
                        sx={{ cursor: 'pointer', '&:hover': { color: '#58a6ff' }, transition: 'color 0.2s ease' }}
                    >
                        Henrique Filho
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Rail sidebar — desktop only */}
            <Box sx={{
                width: RAIL_WIDTH,
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                backgroundColor: '#161b22',
                borderRight: '1px solid #30363d',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                pt: '72px',
                pb: 2,
                gap: 1,
                zIndex: 1200,
            }}>
                {navItems.map(item => (
                    <Tooltip title={item.title} placement="right" key={item.key}>
                        <IconButton
                            onClick={() => navigate(item.key)}
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '10px',
                                color: currentScreen === item.key ? '#58a6ff' : '#8b949e',
                                backgroundColor: currentScreen === item.key ? 'rgba(88,166,255,0.12)' : 'transparent',
                                transition: 'color 0.15s ease, background-color 0.15s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(88,166,255,0.08)',
                                    color: '#e6edf3',
                                },
                            }}
                        >
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>

            {/* Content */}
            <Box sx={{
                ml: { xs: 0, md: `${RAIL_WIDTH}px` },
                mb: { xs: '56px', md: 0 },
            }}>
                <div key={currentScreen} className="page-transition">
                    <CurrentContent onNavigate={setCurrentScreen} />
                </div>
            </Box>

            <VoltarAoTopo />

            {/* Bottom navigation — mobile only */}
            <Paper sx={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0,
                display: { xs: 'block', md: 'none' },
                zIndex: 1300,
                borderTop: '1px solid #30363d',
                borderRadius: 0,
            }}>
                <BottomNavigation
                    value={currentScreen}
                    onChange={(_, value) => navigate(value)}
                    sx={{ backgroundColor: '#161b22' }}
                >
                    {navItems.map(item => (
                        <BottomNavigationAction
                            key={item.key}
                            value={item.key}
                            icon={item.icon}
                            sx={{
                                color: '#8b949e',
                                '&.Mui-selected': { color: '#58a6ff' },
                                minWidth: 0,
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </>
    );
}
