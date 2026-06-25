import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_EVENTS } from '../../services/api/mockData';

const Events: React.FC = () => {
  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero
        title="Upcoming Events"
        subtitle="Join our community for fellowship, learning, and service. There's always a place for you."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {MOCK_EVENTS.map((event, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32) }}
                style={{ height: '100%' }}
              >
                <DataCard
                  image={event.imageUrl}
                  title={event.title}
                  description={event.description}
                  date={new Date(event.date).toLocaleDateString('en-PH', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                  })}
                  subtitle={`${event.time}  ·  ${event.location}`}
                  actionLabel="RSVP / Inquire"
                  onAction={() => window.location.href = '/contact'}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Events;
