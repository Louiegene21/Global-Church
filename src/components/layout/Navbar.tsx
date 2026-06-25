import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Pastors', path: '/pastors' },
  { label: 'Events', path: '/events' },
  { label: 'Ministries', path: '/ministries' },
  { label: 'Contact', path: '/contact' },
  { label: 'About', path: '/about' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        component={RouterLink}
        to="/"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', mb: 3, px: 1 }}
      >
        <Box
          component="img"
          src={logo}
          alt="Global Family Logo"
          sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
        />
        <Box sx={{ fontWeight: 800, fontSize: '0.95rem', color: 'primary.main', letterSpacing: '0.05em' }}>
          GLOBAL FAMILY
        </Box>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontWeight: isActive(item.path) ? 700 : 500 } } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          variant="contained"
          fullWidth
          component={RouterLink}
          to="/login"
          sx={{ borderRadius: 2 }}
        >
          Admin Login
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
          ...(scrolled && {
            boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          }),
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 1.5 }}
            >
              <Box
                component="img"
                src={logo}
                alt="Global Family Logo"
                sx={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  fontWeight: 800,
                  letterSpacing: '.05rem',
                  color: 'primary.main',
                  fontSize: '1rem',
                  display: { xs: 'none', sm: 'block' },
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                GLOBAL FAMILY
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    position: 'relative',
                    px: 1.5,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(item.path) ? '60%' : '0%',
                      height: 2,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      transition: 'width 0.25s ease',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                      '&::after': { width: '60%' },
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to="/login"
                sx={{ ml: 1.5, borderRadius: 2, px: 2.5 }}
              >
                Admin
              </Button>
            </Box>

            {/* Mobile menu toggle */}
            {isMobile && (
              <IconButton
                aria-label="open navigation menu"
                onClick={() => setMobileOpen(true)}
                sx={{ color: 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
