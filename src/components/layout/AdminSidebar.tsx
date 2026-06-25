import React, { useState, useEffect } from 'react';
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
  DialogActions,
  Avatar,
  Fade,
  Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SermonIcon from '@mui/icons-material/Mic';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MinistryIcon from '@mui/icons-material/Handyman';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/api/authService';
import logo from '../../assets/logo.jpg';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Members', icon: <GroupIcon />, path: '/admin/members' },
  { text: 'Speakers', icon: <PeopleIcon />, path: '/admin/speakers' },
  { text: 'Sermons', icon: <SermonIcon />, path: '/admin/sermons' },
  { text: 'Ministries', icon: <MinistryIcon />, path: '/admin/ministries' },
  { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
  { text: 'Announcements', icon: <AnnouncementIcon />, path: '/admin/announcements' },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen = false, onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogout, setOpenLogout] = useState(false);
  const [userName, setUserName] = useState('Admin User');

  useEffect(() => {
    const user = authService.getUser();
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1565c0 0%, #1976d2 60%, #1e88e5 100%)',
        color: 'white',
      }}
    >
      {/* Header */}
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, pb: 2, px: 3 }}>
        <Avatar
          src={logo}
          alt="Church Logo"
          sx={{ width: 44, height: 44, border: '2px solid rgba(255,255,255,0.8)' }}
        />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800,  letterSpacing: 0.5, lineHeight: 1.2, color: 'white' }}>
            GLOBAL FAMILY
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>
            Admin Panel
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ mx: 3, bgcolor: 'rgba(255,255,255,0.12)' }} />

      {/* User profile */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.18)', width: 36, height: 36 }}>
          <AccountCircleIcon fontSize="small" />
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700,  color: 'white', lineHeight: 1.2 }}>
            {userName}
          </Typography>
          <Chip
            label="Admin"
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 700,
              mt: 0.5,
            }}
          />
        </Box>
      </Box>

      {/* Nav Items */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2 }}>
        <Typography
          variant="caption"
          sx={{ px: 2, mb: 1, display: 'block', opacity: 0.45, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2 }}
        >
          Navigation
        </Typography>
        <List disablePadding>
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavClick(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: '10px',
                    py: 1.2,
                    px: 2,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255,255,255,0.16)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        bottom: '20%',
                        width: 4,
                        backgroundColor: 'white',
                        borderRadius: '0 4px 4px 0',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                      transform: 'translateX(3px)',
                    },
                    position: 'relative',
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40, opacity: isActive ? 1 : 0.65 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{ primary: { sx: {
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                      color: 'white',
                    } } }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Logout */}
      <Box sx={{ p: 2, pb: 3 }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <ListItemButton
          onClick={() => setOpenLogout(true)}
          sx={{
            borderRadius: '10px',
            py: 1.5,
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,80,80,0.15)',
              '& .MuiListItemIcon-root': { color: '#ff8a80' },
              '& .MuiListItemText-primary': { color: '#ff8a80' },
            },
          }}
        >
          <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40, transition: 'color 0.2s' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' } } }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        slots={{ transition: Fade }}
        slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to end your administration session? You will need to log in again to access the dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setOpenLogout(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => { setOpenLogout(false); authService.logout(); }}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, px: 3 }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminSidebar;
