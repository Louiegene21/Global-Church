import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  InputBase,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdminSidebar from './AdminSidebar';
import { useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Get current page title based on path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar Component */}
      <AdminSidebar 
        isMobile={isMobile} 
        mobileOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />

      {/* Main Content Area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative' // For mobile menu positioning
        }}
      >
        {/* Mobile menu toggle (Floating if header is removed) */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              bgcolor: 'white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1100,
              '&:hover': { bgcolor: '#f1f5f9' }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Dynamic Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 4, lg: 5 },
            pt: { xs: 8, lg: 5 }, // Extra padding on mobile to avoid the floating button
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
