import React, { useEffect, useRef, useState } from 'react';
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
  Chip,
  Avatar,
} from '@mui/material';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import { MOCK_ANNOUNCEMENTS, MOCK_EVENTS, MOCK_SERMONS } from '../../services/api/mockData';
import { CHURCH_INFO } from '../../constants/church';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import heroBg from '../../assets/hero.png';

// ── Animated counter ────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplay(Math.floor(v)));
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

// ── Section header helper ────────────────────────────────────────────────────
const SectionHeading: React.FC<{ overline: string; title: string; subtitle?: string }> = ({
  overline,
  title,
  subtitle,
}) => (
  <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
    <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
      {overline}
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: subtitle ? 2 : 0 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
        {subtitle}
      </Typography>
    )}
    <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2, mt: 2.5 }} />
  </Box>
);

// ── Fade-up animation wrapper ────────────────────────────────────────────────
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const theme = useTheme();
  const featuredSermons = MOCK_SERMONS.slice(0, 3);
  const upcomingEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <Box>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: `linear-gradient(135deg, rgba(13,27,42,0.88) 0%, rgba(21,101,192,0.80) 100%), url(${heroBg}) center/cover no-repeat`,
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Chip
                  label="Welcome to Global Family Church"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.light, 0.2),
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 700,
                    mb: 3,
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                />
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    letterSpacing: '-0.02em',
                    color: 'white',
                  }}
                >
                  {CHURCH_INFO.tagline}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'rgba(255,255,255,0.75)', mb: 2, fontWeight: 400, maxWidth: 540, lineHeight: 1.75 }}
                >
                  "With man this is impossible, but with God all things are possible."
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 4, fontStyle: 'italic' }}
                >
                  — Matthew 19:26
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/sermons"
                    startIcon={<PlayCircleIcon />}
                    sx={{
                      py: 1.75,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(33,150,243,0.4)',
                    }}
                  >
                    Watch Sermons
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/about"
                    sx={{
                      py: 1.75,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: 3,
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.4)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Our Mission
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            {/* Service times card */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <AccessTimeIcon sx={{ color: 'primary.light' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800,  color: 'white' }}>
                      Service Schedule
                    </Typography>
                  </Box>
                  <Stack spacing={2.5}>
                    {CHURCH_INFO.serviceTimes.map((s, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1.5,
                          px: 2,
                          borderRadius: 2,
                          bgcolor: i === 0 ? alpha(theme.palette.primary.main, 0.25) : 'rgba(255,255,255,0.05)',
                          border: i === 0 ? `1px solid ${alpha(theme.palette.primary.light, 0.3)}` : '1px solid transparent',
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700,  color: 'white', lineHeight: 1.2 }}>
                            {s.day}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
                            {s.label}
                          </Typography>
                        </Box>
                        <Chip
                          label={s.time}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.12)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: 'primary.light', mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                      {CHURCH_INFO.address}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Bottom fade */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`,
          }}
        />
      </Box>

      {/* ── Announcements ───────────────────────────────────────────────── */}
      <Box sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 2 }}>
        <Container maxWidth="lg">
          <FadeUp>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.05)',
                borderLeft: `6px solid ${theme.palette.primary.main}`,
                boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                  <AnnouncementIcon />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Notice Board
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {MOCK_ANNOUNCEMENTS.map((ann, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={ann.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.015 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          bgcolor: ann.isUrgent ? alpha(theme.palette.error.main, 0.03) : 'background.paper',
                          border: ann.isUrgent ? `1px solid ${alpha(theme.palette.error.main, 0.15)}` : '1px solid rgba(0,0,0,0.05)',
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700,  lineHeight: 1.3, pr: 1 }}>
                              {ann.title}
                            </Typography>
                            {ann.isUrgent && <Chip label="Urgent" color="error" size="small" sx={{ flexShrink: 0 }} />}
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1.5 }}>
                            {ann.content}
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600 }}>
                            {new Date(ann.date).toLocaleDateString('en-PH', {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </FadeUp>
        </Container>
      </Box>

      {/* ── Stats Counter ───────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: 'primary.dark', py: { xs: 6, md: 8 }, mb: 10, color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { icon: <PeopleIcon sx={{ fontSize: 32 }} />, value: 500, suffix: '+', label: 'Active Members' },
              { icon: <MenuBookIcon sx={{ fontSize: 32 }} />, value: 120, suffix: '+', label: 'Sermons Preached' },
              { icon: <FavoriteIcon sx={{ fontSize: 32 }} />, value: 6, suffix: '', label: 'Active Ministries' },
              { icon: <EmojiEventsIcon sx={{ fontSize: 32 }} />, value: 15, suffix: '+', label: 'Years of Ministry' },
            ].map((stat, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <FadeUp delay={i * 0.1}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>{stat.icon}</Box>
                    <Typography
                      sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '3rem' }, lineHeight: 1, color: 'white' }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1, fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </FadeUp>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Mission & Vision ────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeUp>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                OUR MISSION
              </Typography>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mt: 1, lineHeight: 1.2 }}>
                Empowering Lives Through Faith
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 4 }}>
                At Global Family Church, we believe in a gospel that transforms lives. Our mission is to lead
                people into a growing relationship with Jesus Christ by creating an environment where seekers
                are safe and the Word of God is supreme.
              </Typography>
              <Stack spacing={2} sx={{ mb: 4 }}>
                {['Rooted in Prayer', 'Grounded in the Word', 'Growing in Fellowship'].map((point) => (
                  <Box key={point} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Button
                variant="contained"
                component={RouterLink}
                to="/about"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: 3, px: 3.5, py: 1.5 }}
              >
                Learn More About Us
              </Button>
            </FadeUp>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeUp delay={0.15}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop"
                  alt="Church community"
                  sx={{ width: '100%', borderRadius: 5, boxShadow: '0 24px 60px rgba(0,0,0,0.14)' }}
                />
                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    left: -24,
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 900 }}>
                    Est. 2009
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Serving Bacolod City
                  </Typography>
                </Paper>
              </Box>
            </FadeUp>
          </Grid>
        </Grid>
      </Container>

      {/* ── Latest Sermons ──────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), py: { xs: 8, md: 12 }, mb: 0 }}>
        <Container maxWidth="lg">
          <FadeUp>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
              <Box>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                  RECENT MESSAGES
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800,  mt: 0.5 }}>
                  Latest Sermons
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/sermons"
                endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 700, display: { xs: 'none', sm: 'flex' } }}
              >
                View All
              </Button>
            </Box>
          </FadeUp>

          <Grid container spacing={3}>
            {featuredSermons.map((sermon, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={sermon.id}>
                <FadeUp delay={index * 0.12}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        '&:hover': { boxShadow: '0 20px 48px rgba(0,0,0,0.1)' },
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <Box
                          component="img"
                          src={sermon.thumbnail_url}
                          alt={sermon.title}
                          sx={{
                            width: '100%',
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                            '.MuiCard-root:hover &': { transform: 'scale(1.05)' },
                          }}
                        />
                        {sermon.category && (
                          <Chip
                            label={sermon.category}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              bgcolor: 'rgba(255,255,255,0.9)',
                              fontWeight: 700,
                              color: 'primary.main',
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            bgcolor: 'rgba(0,0,0,0.3)',
                            '.MuiCard-root:hover &': { opacity: 1 },
                          }}
                        >
                          <PlayCircleIcon sx={{ fontSize: 56, color: 'white' }} />
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 700,  textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {new Date(sermon.date).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700,  mt: 0.75, mb: 0.75, lineHeight: 1.3 }}>
                          {sermon.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                          By {sermon.speaker}
                        </Typography>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<PlayCircleIcon />}
                          onClick={() => window.open(sermon.watch_url, '_blank')}
                          sx={{ borderRadius: 2, fontWeight: 700 }}
                        >
                          Watch Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeUp>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5, display: { sm: 'none' } }}>
            <Button component={RouterLink} to="/sermons" endIcon={<ArrowForwardIcon />} variant="outlined" sx={{ borderRadius: 3 }}>
              View All Sermons
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── Upcoming Events ─────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <FadeUp>
          <SectionHeading
            overline="WHAT'S COMING"
            title="Upcoming Events"
            subtitle="Join us for fellowship, learning, and service. There's always something happening at Global Family."
          />
        </FadeUp>

        <Grid container spacing={3}>
          {upcomingEvents.map((event, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={event.id}>
              <FadeUp delay={index * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  <Card sx={{ borderRadius: 4, overflow: 'hidden', height: '100%', '&:hover': { boxShadow: '0 20px 48px rgba(0,0,0,0.1)' } }}>
                    <Box
                      component="img"
                      src={event.imageUrl}
                      alt={event.title}
                      sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          icon={<EventIcon sx={{ fontSize: '14px !important' }} />}
                          label={new Date(event.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip label={event.time} size="small" variant="outlined" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 700,  mb: 1, lineHeight: 1.3 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65 }}>
                        {event.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {event.location}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeUp>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            to="/events"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 700 }}
          >
            See All Events
          </Button>
        </Box>
      </Container>

      {/* ── Call to Action ──────────────────────────────────────────────── */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeUp>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 700, letterSpacing: 3 }}>
              JOIN US THIS SUNDAY
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: 'white', fontWeight: 900, mt: 1.5, mb: 3, lineHeight: 1.2 }}
            >
              You're Always Welcome Here
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 5, fontWeight: 400, lineHeight: 1.75 }}>
              No matter where you are in life, there is a place for you at Global Family Church.
              Come as you are and experience the love of God with our community.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.dark',
                  fontWeight: 800,
                  borderRadius: 3,
                  px: 4,
                  py: 1.75,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Get in Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/ministries"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 4,
                  py: 1.75,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                Explore Ministries
              </Button>
            </Stack>
          </FadeUp>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
