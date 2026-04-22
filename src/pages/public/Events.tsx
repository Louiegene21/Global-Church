import React from 'react';
import { Container, Grid, Box, Typography, Stack, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_EVENTS } from '../../services/api/mockData';

const Events: React.FC = () => {
  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero 
        title="Upcoming Events" 
        subtitle="Join our community for fellowship, learning, and service. There's always a place for you."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth={false} sx={{ px: 2, mt: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          {MOCK_EVENTS.map((event) => (
            <Box 
              key={event.id}
              sx={{ 
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 24px)',
                  md: '1 1 calc(33.333% - 24px)',
                  lg: '1 1 calc(25% - 24px)'
                },
                maxWidth: {
                  lg: 'calc(25% - 24px)'
                }
              }}
            >
              <DataCard
                image={event.imageUrl}
                title={event.title}
                description={event.description}
                date={new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                subtitle={`${event.time} | ${event.location}`}
                actionLabel="RSVP or Inquire"
                onAction={() => console.log('RSVP')}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Events;
