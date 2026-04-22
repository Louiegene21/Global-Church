import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';

const beliefs = [
  {
    title: 'The Holy Trinity',
    text: 'We believe in the Holy Trinity that God has three persons, The Father, the Son and the Holy Spirit.',
    reference: '1 John 5:7'
  },
  {
    title: 'The Bible',
    text: 'We believe that the Bible is a complete and ordained Word of God which is the ultimate basis of teaching and doctrine.',
    reference: '2 Timothy 3:16'
  },
  {
    title: 'Salvation',
    text: 'We believe that man is saved through faith and not by works.',
    reference: 'Ephesians 2:8-9'
  },
  {
    title: 'Spiritual Gifts',
    text: 'We believe that God has endowed men with gifts to be utilized for the expansion of the Kingdom and needs to be activated by the Holy Spirit.',
    reference: 'Ephesians 4:8'
  }
];

const pillars = [
  {
    title: 'Prayer',
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    description: 'A prayerful christian is a powerful christian. It is a way to communicate to God to know His will.'
  },
  {
    title: 'Word',
    icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    description: "The Bible is very vital in the spiritual growth of a christian. God's word is food for the spirit."
  },
  {
    title: 'Fellowship',
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    description: 'The fire of the Holy Spirit can set ablaze with continuing meeting with other believers.'
  },
  {
    title: 'Discipleship',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    description: 'The secret to growth is spiritual discipline by leading others through the example of Jesus Christ.'
  }
];

// ✅ Vision & Mission
const visionMission = {
  vision: `Train believers to become ambassadors of Christ, walking in His image and likeness to reflect God's glory into the world.`,
  mission: `To disciple and equip believers through God's Word, passionate worship, and Christ-centered community, empowering them to live out their faith and share the love of Jesus.`
};

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: 4,
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                textAlign: 'center',
                mb: 2
              }}
            >
              OUR IDENTITY & MISSION
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' }
              }}
            >
              Global Family Jesus Christ the Redeemer Church
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                lineHeight: 1.8,
                fontWeight: 400,
                opacity: 0.95,
                maxWidth: '850px',
                mx: 'auto'
              }}
            >
              A Full Gospel Non-denominational Christian Church that believes the church is called as a corporate body of Christ Jesus moving in Apostolic, Prophetic, Evangelism, Pastoring and Teaching. The church is devoted to reaching out to the lost and training them to become future leaders and ministers of God.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Beliefs Section */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 4, md: 8 },
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
          >
            <Typography
              variant="h3"
              sx={{ textAlign: 'center', mb: 8, fontWeight: 800, color: 'primary.main' }}
            >
              Our Beliefs
            </Typography>
            <Grid container spacing={6}>
              {beliefs.map((belief, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          width: 48,
                          height: 48
                        }}
                      >
                        <VerifiedIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          {belief.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {belief.text}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {belief.reference}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* Pillars */}
      <Container maxWidth={false} sx={{ mt: 15, px: { xs: 4, md: 6, lg: 10 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
              Pillars of Maturity
            </Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2, mb: 3 }} />
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Foundational principles that guide our spiritual journey and catalyze our growth as faithful followers of Christ.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: 4
            }}
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Card sx={{ 
                  borderRadius: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}>
                  <CardContent>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 90, height: 90, mx: 'auto', mb: 3 }}>
                      {pillar.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {pillar.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* ✅ Vision & Mission Bottom */}
      <Container maxWidth={false} sx={{ mt: 15, px: { xs: 4, md: 6, lg: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
              Vision & Mission
            </Typography>
            <Box sx={{ width: 80, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2, mb: 3 }} />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr'
              },
              gap: 4
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card sx={{ borderRadius: 4, textAlign: 'center', p: 4, height: '100%' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'primary.main' }}>
                    Our Vision
                  </Typography>
                  <Typography color="text.secondary">
                    {visionMission.vision}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{ borderRadius: 4, textAlign: 'center', p: 4, height: '100%' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'primary.main' }}>
                    Our Mission
                  </Typography>
                  <Typography color="text.secondary">
                    {visionMission.mission}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;