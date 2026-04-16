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
  Fade
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

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || parsed.username || 'Admin User');
      } catch (e) {}
    }
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1565c0 0%, #1976d2 100%)', color: 'white' }}>
      {/* Header Section */}
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, pb: 2, px: 3 }}>
        <Avatar
          src="/src/assets/logo.jpg"
          sx={{
            width: 45,
            height: 45,
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="800" sx={{ letterSpacing: 0.5, lineHeight: 1.2 }}>
            GLOBAL FAMILY
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500, textTransform: 'uppercase' }}>
            Church Admin
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ mx: 3, my: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* User Profile Section */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 32, height: 32 }}>
          <AccountCircleIcon fontSize="small" />
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Standard Admin
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, mt: 1 }}>
        <Typography variant="caption" sx={{ px: 2, mb: 1, display: 'block', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          Navigation
        </Typography>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavClick(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    px: 2,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        bottom: '20%',
                        width: '4px',
                        backgroundColor: 'white',
                        borderRadius: '0 4px 4px 0',
                      }
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40, opacity: isActive ? 1 : 0.7 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: 0.2
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, mt: 'auto', pb: 4 }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <ListItemButton
          onClick={() => setOpenLogout(true)}
          sx={{
            borderRadius: '12px',
            py: 1.5,
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 61, 0, 0.15)',
              '& .logout-icon': { color: '#ff5252' },
              '& .logout-text span': { color: '#ff5252' }
            }
          }}
        >
          <ListItemIcon className="logout-icon" sx={{ color: 'white', minWidth: 40, transition: 'color 0.2s' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            className="logout-text"
            primary="Logout Session"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
            bgcolor: '#1976d2',
            backgroundImage: 'linear-gradient(180deg, #1565c0 0%, #1976d2 100%)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        TransitionComponent={Fade}
        transitionDuration={400}
        PaperProps={{ sx: { borderRadius: 3, p: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            Are you sure you want to end your administration session? You will need to log in again to access the dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setOpenLogout(false)} color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenLogout(false);
              authService.logout();
            }}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, px: 3, fontWeight: 'bold', textTransform: 'none', boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)' }}
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
