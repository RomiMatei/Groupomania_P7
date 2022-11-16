import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import { history } from 'helpers';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from 'features';

import {
  AppBar,
  Container,
  Box,
  Menu,
  Typography,
  MenuItem,
  Link,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import { Home, MenuOpen } from '@mui/icons-material';

export { Nav };

function Nav() {
  const authUser = useSelector((x) => x.auth.user);
  const dispatch = useDispatch();
  const logoutClick = () => {
    dispatch(logout());
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getMyProfile = () => {
    history.navigate(`/user/${authUser.id}`);
  };

  // only show nav when logged in
  if (!authUser) return null;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Home sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link
            onClick={() => {
              history.navigate(`/`);
            }}
            component="button"
            underline="none"
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Groupomania
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuOpen />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <Typography textAlign="center"> Test Menu </Typography>
            </Menu>
          </Box>
          {/* <HomeMaxRounded sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography> */}
          <Link
            onClick={() => {
              history.navigate(`/`);
            }}
            component="button"
            underline="none"
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Groupomania
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="1" onClick={getMyProfile}>
                <Typography textAlign="center">Editer Mon Profil</Typography>
              </MenuItem>
              <MenuItem key="2" onClick={logoutClick}>
                <Typography textAlign="center">Déconnexion</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
