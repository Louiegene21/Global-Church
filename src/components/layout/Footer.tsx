import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'white', pt: 8, pb: 4, borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
              <Box 
                component="img"
                src="/src/assets/logo.jpg"
                alt="Global Family Logo"
                sx={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <Typography variant="h6" color="primary.main" fontWeight="800">
                GLOBAL FAMILY
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              Jesus Christ the Redeemer Church. A community dedicated to worship, fellowship, and spreading the word of God to all nations.
            </Typography>
            <Box>
              <IconButton color="primary" size="small"><FacebookIcon /></IconButton>
              <IconButton color="primary" size="small"><TwitterIcon /></IconButton>
              <IconButton color="primary" size="small"><InstagramIcon /></IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Home</Link>
              <Link href="/sermons" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Sermons</Link>
              <Link href="/events" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Events</Link>
              <Link href="/ministries" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Ministries</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="700">
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  123 Church Ave, Grace City, GC 54321
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  +1 (234) 567-8900
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  info@globalfamily.church
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Global Family Jesus Christ the Redeemer Church. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
