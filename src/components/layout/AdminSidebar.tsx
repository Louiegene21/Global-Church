import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography, 
  Divider,
  Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SermonIcon from '@mui/icons-material/Mic';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MinistryIcon from '@mui/icons-material/Handyman';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Manage Sermons', icon: <SermonIcon />, path: '/admin/sermons' },
  { text: 'Manage Pastors', icon: <PeopleIcon />, path: '/admin/pastors' },
  { text: 'Manage Events', icon: <EventIcon />, path: '/admin/events' },
  { text: 'Manage Ministries', icon: <MinistryIcon />, path: '/admin/ministries' },
  { text: 'Announcements', icon: <AnnouncementIcon />, path: '/admin/announcements' },
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1976d2 0%, #2196f3 100%)',
          color: 'white'
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
        <Box 
          component="img"
          src="/src/assets/logo.jpg"
          alt="Global Family Logo"
          sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%',
            border: '2px solid white'
          }}
        />
        <Typography variant="h6" noWrap component="div" fontWeight="bold">
          ADMIN PANEL
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto', p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                  },
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />
        <Button 
          fullWidth 
          variant="text" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ color: 'white', justifyContent: 'flex-start', px: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
