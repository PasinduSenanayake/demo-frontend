import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import Home from '../container/Home';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import PageLoader from '../component/PageLoader';
import { shallowEqual, useSelector } from 'react-redux';
import Favourites from '../container/Favourites';
import { Navigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
        background: {
            default: '#1f485d'
        },
    }
});


const componentNavigator = (location) => {
    switch (location) {
        case 'Home':
            return <Home />
        case 'Favourites':
            return <Favourites />
        default:
            return <Navigate to={'/404'} />;

    }
}



function AppBase() {

    const { spellListLoading } = useSelector(state => ({
        spellListLoading: state.spell.spellListLoading
    }),
        shallowEqual
    );

    const [location, setLocation] = useState('Home');
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const isPreloadComplete = !spellListLoading;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem key={'Home'} onClick={() => {
                                    setLocation('Home')
                                    handleCloseNavMenu();
                                }}>
                                    <Typography textAlign="center">{'Home'}</Typography>
                                </MenuItem>
                                <MenuItem key={'Favourites'} onClick={() => {
                                    setLocation('Favourites')
                                    handleCloseNavMenu();
                                }}>
                                    <Typography textAlign="center">{'Favourites'}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                disabled={location === 'Home'}
                                key={'Home'}
                                onClick={() => { setLocation('Home') }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {'Home'}
                            </Button>
                            <Button
                                disabled={location === 'Favourites'}
                                key={'Favourites'}
                                onClick={() => { setLocation('Favourites') }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {'Favourites'}
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isPreloadComplete ? componentNavigator(location) : <PageLoader />}
        </ThemeProvider>
    );
}

export default AppBase;
