import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SermonIcon from '@mui/icons-material/Mic';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MinistryIcon from '@mui/icons-material/Handyman';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/api/authService';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Sermons', icon: <SermonIcon />, path: '/admin/sermons' },
  { text: 'Pastors', icon: <PeopleIcon />, path: '/admin/pastors' },
  { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
  { text: 'Ministries', icon: <MinistryIcon />, path: '/admin/ministries' },
  { text: 'Announcements', icon: <AnnouncementIcon />, path: '/admin/announcements' },
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogout(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogout(false);
    authService.logout();
  };

  const handleLogoutCancel = () => {
    setOpenLogout(false);
  };

  return (
    <>
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

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
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
          </Box>

          <Box sx={{ p: 3, mb: 1 }}>
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mb: 3 }} />
            <Button
              fullWidth
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogoutClick}
              sx={{
                borderRadius: '15px',
                py: 1.1,
                px: 3,
                bgcolor: '#ff3d00',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  bgcolor: '#d50000',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Dialog
        open={openLogout}
        onClose={handleLogoutCancel}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out from the Admin Panel?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleLogoutCancel} color="inherit" sx={{ fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
            autoFocus
          >
            Confirm Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminSidebar;
