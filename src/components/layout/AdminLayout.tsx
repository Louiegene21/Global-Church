import React, { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar from './AdminSidebar';

const drawerWidth = 280;

const AdminLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AdminSidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              bgcolor: 'white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1100,
              '&:hover': { bgcolor: '#f1f5f9' },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4, lg: 5 },
            pt: { xs: 8, lg: 5 },
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
