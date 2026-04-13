import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Stack, 
  Paper,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { MOCK_ANNOUNCEMENTS, MOCK_EVENTS } from '../../services/api/mockData';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';

const Home: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          background: 'linear-gradient(rgba(33, 150, 243, 0.8), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&auto=format&fit=crop") center/cover no-repeat',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" sx={{ color: 'primary.dark', mb: 2, fontWeight: 900 }}>
              Global Family Church
            </Typography>
            <Typography variant="h4" sx={{ color: 'text.secondary', mb: 4, maxWidth: '600px' }}>
              Where every soul finds a home and every heart finds hope in Jesus Christ.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large">Watch Services</Button>
              <Button variant="outlined" size="large">Our Mission</Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Announcements Notice Board */}
      <Box sx={{ mt: -8, mb: 10, position: 'relative', zIndex: 2 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, borderLeft: '8px solid #2196f3' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <AnnouncementIcon color="primary" fontSize="large" />
              <Typography variant="h4" fontWeight="bold">Notice Board</Typography>
            </Box>
            <Grid container spacing={3}>
              {MOCK_ANNOUNCEMENTS.map((ann, index) => (
                <Grid item xs={12} md={6} key={ann.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card sx={{ height: '100%', bgcolor: ann.isUrgent ? 'rgba(33, 150, 243, 0.05)' : 'white' }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="h6" fontWeight="bold">{ann.title}</Typography>
                          {ann.isUrgent && <Chip label="Urgent" color="error" size="small" />}
                        </Stack>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {ann.content}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          Posted on {new Date(ann.date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
              OUR MISSION
            </Typography>
            <Typography variant="h2" gutterBottom>
              Empowering Lives Through Faith
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
              At Global Family Church, we believe in a gospel that transforms specifically for today's world. Our mission is to lead people into a growing relationship with Jesus Christ by creating an environment where seekers are safe and the word of God is supreme.
            </Typography>
            <Button variant="text" color="primary" sx={{ fontWeight: 'bold' }}>Read More about our vision →</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop"
              sx={{ width: '100%', borderRadius: 4, boxShadow: 10 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
