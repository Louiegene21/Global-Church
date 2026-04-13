import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Pastors', path: '/pastors' },
  { label: 'Events', path: '/events' },
  { label: 'Ministries', path: '/ministries' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        GLOBAL FAMILY
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding component={RouterLink} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
            <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
        <ListItem disablePadding component={RouterLink} to="/login" sx={{ mt: 2 }}>
          <Button variant="contained" fullWidth>Admin Login</Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo Placeholder */}
            <Box 
              component={RouterLink} 
              to="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                gap: 1.5
              }}
            >
              <Box 
                component="img"
                src="/src/assets/logo.jpg"
                alt="Global Family Logo"
                sx={{ 
                  width: 45, 
                  height: 45, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '.05rem',
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                GLOBAL FAMILY
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
                >
                  {item.label}
                </Button>
              ))}
              <Button 
                variant="outlined" 
                size="small"
                component={RouterLink}
                to="/login"
                sx={{ ml: 2 }}
              >
                Admin
              </Button>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
