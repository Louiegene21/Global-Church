import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { CHURCH_INFO } from '../../constants/church';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Events', path: '/events' },
  { label: 'Ministries', path: '/ministries' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#0d1b2a', color: 'rgba(255,255,255,0.85)', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand & Socials */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="Global Family Logo"
                sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800,  color: 'white', letterSpacing: '0.05em' }}>
                GLOBAL FAMILY
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, mb: 3, maxWidth: 280 }}>
              A Full Gospel Non-denominational Christian Church devoted to reaching the lost and training future leaders and ministers of God.
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton
                href={CHURCH_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#1877f2', bgcolor: 'rgba(24,119,242,0.1)' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href={CHURCH_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#1da1f2', bgcolor: 'rgba(29,161,242,0.1)' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href={CHURCH_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#e1306c', bgcolor: 'rgba(225,48,108,0.1)' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href={CHURCH_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#ff0000', bgcolor: 'rgba(255,0,0,0.1)' } }}
              >
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Service Times */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'white', mb: 2.5 }}>
              Service Schedule
            </Typography>
            <Stack spacing={2}>
              {CHURCH_INFO.serviceTimes.map((s, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.light', mt: 0.2 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      {s.day} — {s.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
                      {s.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'white', mb: 2.5 }}>
              Get in Touch
            </Typography>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: 'primary.light', mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {CHURCH_INFO.address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: 18, color: 'primary.light', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {CHURCH_INFO.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'primary.light', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {CHURCH_INFO.email}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.8125rem',
                    '&:hover': { color: 'primary.light' },
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          © {new Date().getFullYear()} {CHURCH_INFO.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
