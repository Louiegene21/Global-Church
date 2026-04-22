import React from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Stack,
  IconButton
} from '@mui/material';
import PublicHero from '../../components/common/PublicHero';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero 
        title="Contact Us" 
        subtitle="Have questions or want to learn more? We'd love to hear from you. Reach out to our team today."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth={false} sx={{ px: { xs: 4, md: 6, lg: 10 }, mt: 6 }}>
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" fontWeight="800" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Whether you're looking for a church home, need prayer, or just want to say hi, our doors and hearts are always open.
            </Typography>

            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper sx={{ p: 1.5, borderRadius: 3, color: 'primary.main', bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                  <LocationOnIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Our Location</Typography>
                  <Typography variant="body2" color="text.secondary">123 Faith Street, Grace City, GC 45678</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper sx={{ p: 1.5, borderRadius: 3, color: 'primary.main', bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                  <PhoneIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Phone Number</Typography>
                  <Typography variant="body2" color="text.secondary">+1 (234) 567-890</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper sx={{ p: 1.5, borderRadius: 3, color: 'primary.main', bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                  <EmailIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Email Address</Typography>
                  <Typography variant="body2" color="text.secondary">info@globalfamilychurch.org</Typography>
                </Box>
              </Box>
            </Stack>

            <Box sx={{ mt: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Follow Us</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary"><FacebookIcon /></IconButton>
                <IconButton color="primary"><TwitterIcon /></IconButton>
                <IconButton color="primary"><InstagramIcon /></IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
              <Typography variant="h5" fontWeight="bold" mb={4}>Send us a Message</Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" variant="outlined" required sx={{ bgcolor: '#fbfbfb' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" variant="outlined" required sx={{ bgcolor: '#fbfbfb' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" variant="outlined" type="email" required sx={{ bgcolor: '#fbfbfb' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" variant="outlined" sx={{ bgcolor: '#fbfbfb' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Your Message" 
                      variant="outlined" 
                      multiline 
                      rows={4} 
                      required 
                      sx={{ bgcolor: '#fbfbfb' }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      fullWidth 
                      sx={{ py: 2, fontWeight: 'bold', fontSize: '1rem' }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Map Placeholder */}
        <Box sx={{ mt: 10, height: 400, borderRadius: 6, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <Typography variant="h6" color="text.secondary">Interactive Map Coming Soon</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
