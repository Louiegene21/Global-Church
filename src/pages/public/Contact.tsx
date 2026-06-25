import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PublicHero from '../../components/common/PublicHero';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';
import { CHURCH_INFO } from '../../constants/church';

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const ContactInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon, label, value,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          color: 'primary.main',
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700, mb: 0.25 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const Contact: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: 'success' | 'error' }>({
    open: false, severity: 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Replace with real API call when backend is ready
      await new Promise((res) => setTimeout(res, 1200));
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setSnackbar({ open: true, severity: 'success' });
    } catch {
      setSnackbar({ open: true, severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero
        title="Contact Us"
        subtitle="Have questions or want to learn more? We'd love to hear from you. Reach out to our team today."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <FadeUp>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
                Whether you're looking for a church home, need prayer, or just want to say hi — our doors
                and hearts are always open.
              </Typography>

              <Stack spacing={3.5} sx={{ mb: 5 }}>
                <ContactInfoItem
                  icon={<LocationOnIcon />}
                  label="Our Location"
                  value={CHURCH_INFO.address}
                />
                <ContactInfoItem
                  icon={<PhoneIcon />}
                  label="Phone Number"
                  value={CHURCH_INFO.phone}
                />
                <ContactInfoItem
                  icon={<EmailIcon />}
                  label="Email Address"
                  value={CHURCH_INFO.email}
                />
              </Stack>

              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  {[
                    { icon: <FacebookIcon />, href: CHURCH_INFO.socials.facebook, color: '#1877f2' },
                    { icon: <TwitterIcon />, href: CHURCH_INFO.socials.twitter, color: '#1da1f2' },
                    { icon: <InstagramIcon />, href: CHURCH_INFO.socials.instagram, color: '#e1306c' },
                    { icon: <YouTubeIcon />, href: CHURCH_INFO.socials.youtube, color: '#ff0000' },
                  ].map(({ icon, href, color }, i) => (
                    <IconButton
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { color, bgcolor: `${color}18` },
                        transition: 'all 0.2s',
                      }}
                    >
                      {icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </FadeUp>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <FadeUp delay={0.1}>
              <Paper
                elevation={0}
                sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
                  Send Us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        endIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                        sx={{ py: 1.75, fontWeight: 700, fontSize: '1rem', borderRadius: 3 }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </FadeUp>
          </Grid>
        </Grid>

        {/* Map placeholder */}
        <FadeUp delay={0.1}>
          <Box
            sx={{
              mt: 10,
              height: 400,
              borderRadius: 5,
              bgcolor: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Interactive Map — Coming Soon
            </Typography>
          </Box>
        </FadeUp>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.severity === 'success'
            ? 'Thank you! Your message has been sent. We\'ll get back to you soon.'
            : 'Something went wrong. Please try again.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
